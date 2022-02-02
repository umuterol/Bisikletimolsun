const asyncHandler = require("express-async-handler");
const { successMessage, errorMessage } = require("../../helpers/resMessage");
const { nowDate, calculateTimeDifference } = require("../date");
const getBicycleCoords = require("./getBicycleCoords");
const calculateDrivePay = require("./calculateDrivePay");


const finishDrive = asyncHandler(
    async (req, res, sequelize, drive_transactions) => {
        const { drive, bicycle, bicycle_coords, bicycles_transactions, wallet_transactions } = sequelize.models;
        const { tc } = req.body;

        const existingDrive = await isExistingDrive(tc, drive, drive_transactions)
        if (!existingDrive) {
            return errorMessage(res, "No active driving.", 400);
        }
        drive_transactions.drive_id = existingDrive.id;
        await drive_transactions.save();

        const { bicycle_id } = existingDrive;

        const usedBicycle = await bicycle.findOne({
            where: {
                id: bicycle_id,
            }
        })

        const pay = calculateDrivePay(usedBicycle.price, existingDrive.start_time);
        const minute = calculateTimeDifference(existingDrive.start_time)

        const wt = await wtCreate(wallet_transactions, tc, pay);
        if (wt.status === "insufficient balance") {
            drive_transactions.status = 'unsuccessful';
            await drive_transactions.save();
            return errorMessage(res, "insufficient balance.", 400);
        } else if (wt.status !== "successful") {
            drive_transactions.status = 'unsuccessful';
            await drive_transactions.save();
            return errorMessage(res, "payment failed.", 400);
        }

        const btStatus = await btCreate(bicycles_transactions, bicycle_id, pay, existingDrive.id, wt.id)
        if (btStatus !== 'successful') {
            drive_transactions.status = 'unsuccessful';
            await drive_transactions.save();
            return errorMessage(res, "could not be finished. Please try again.", 400);
        }

        const coords = await bicycle_coords.findByPk(bicycle_id);
        let updatedDrive;
        try {
            updatedDrive = await existingDrive.update({
                pay,
                minute,
                finish_time: nowDate(),
                finish_lat: coords.lat,
                finish_lng: coords.lng,
                status: 'notactive',
                wallet_transaction_id: wt.id,
            })
            await usedBicycle.update({ status: 'parked' })
            drive_transactions.status = 'successful';
            await drive_transactions.save();
        } catch (error) {
            drive_transactions.status = 'unsuccessful';
            await drive_transactions.save();
            console.log(error);
        }

        return successMessage(res, updatedDrive, "driving is complete.");
    }
)


module.exports = finishDrive;

const isExistingDrive = async (tc, drive, drive_transactions) => {
    const existingDrive = await drive.findOne({
        where: {
            tc,
            status: 'active',
        }
    })
    if (!existingDrive) {
        drive_transactions.status = "unsuccessful";
        await drive_transactions.save();
        return false;
    }
    return existingDrive;
}

const btCreate = async (bicycles_transactions, bicycle_id, pay, drive_id, wallet_transaction_id) => {
    try {
        const bt = await bicycles_transactions.create({
            bicycle_id,
            transaction_type: 'mining',
            transaction_amount: pay,
            drive_id,
            wallet_transaction_id,
        })
        return bt.status;
    } catch (error) {
        console.log(error)
        return false;
    }
}

const wtCreate = async (wallet_transactions, tc, transaction_amount) => {
    try {
        const wt = await wallet_transactions.create({
            tc,
            transaction_amount,
            transaction_type: 'buy',
        })
        return wt;
    } catch (error) {
        console.log(error);
        return false;
    }
}