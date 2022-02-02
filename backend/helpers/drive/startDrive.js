const { successMessage, errorMessage } = require("../../helpers/resMessage");
const { nowDate } = require("../date");
const getBicycleCoords = require("./getBicycleCoords");

const startDrive = async (req, res, sequelize, drive_transactions) => {
    const { drive, bicycle_coords, bicycle } = sequelize.models;
    const { tc, bicycle_id } = req.body;

    const existingDrive = await drive.findOne({
        where: {
            tc,
            status: 'active',
        }
    })
    if (existingDrive) {
        drive_transactions.status = "unsuccessful";
        await drive_transactions.save();
        return errorMessage(res, "you already have active driving", 400);
    }

    const selectedBicycle = await bicycle.findOne({
        where: {
            id: bicycle_id,
            status: 'parked',
        }
    })
    if (!selectedBicycle) {
        drive_transactions.status = "unsuccessful";
        await drive_transactions.save();
        return errorMessage(res, "sorry you can't use this bike.", 400);
    }

    const coords = await getBicycleCoords(bicycle_coords, bicycle_id);
    if (!coords) {
        drive_transactions.status = "unsuccessful";
        await drive_transactions.save();
        return errorMessage(res, "location not found of bicycle", 400);
    }

    const newDriveData = {
        tc,
        bicycle_id,
        start_lat: coords.lat,
        start_lng: coords.lng,
        start_time: nowDate(),
        status: 'active'
    }


    try {
        const createdDrive = await drive.create(newDriveData)
        drive_transactions.status = "successful";
        drive_transactions.drive_id = createdDrive.id;
        selectedBicycle.status = 'using';
        await selectedBicycle.save();
        await drive_transactions.save();

        const data = { drive_transactions, driveInformation: createdDrive }
        return successMessage(res, data, "driving started.");
    } catch (error) {
        console.log(error)
        return errorMessage(res, error, 400)
    }
}

module.exports = startDrive;