const calculateDrivePay = require("../drive/calculateDrivePay");
const { calculateTimeDifference, nowDate } = require('../date');
const asyncHandler = require("express-async-handler");

const driveAfterFindHandler = async (sequelize, data) => {
    if (!data) {
        return;
    }
    const isArray = Array.isArray(data);
    const { bicycle } = sequelize.models;

    if (isArray) {
        await manyDriveUpdate(data, bicycle);
    }
    else {
        await oneDriveUpdate(data, bicycle);
    }
}

const driveAfterUpdateHandler = async (sequelize, drive) => {
    if (drive.changed('status') && drive.status === "notactive") {
        await getDriveRouteMap(drive, sequelize);
    }
}
module.exports = {
    driveAfterFindHandler,
    driveAfterUpdateHandler,
};

const oneDriveUpdate = asyncHandler(
    async (data, bicycle) => {
        const { status } = data;
        if (status !== 'active')
            return;
        const { pay, minute } = await calculateInfoDrive(data, bicycle);
        await data.update({
            pay,
            minute,
        })
    }
)


const manyDriveUpdate = asyncHandler(
    async (data, bicycle) => {
        data.map(async (drive, index) => {
            await oneDriveUpdate(drive, bicycle);
        })
    }
)

const calculateInfoDrive = asyncHandler(
    async (drive, bicycle) => {
        const { start_time } = drive;
        const { price } = await bicycle.findByPk(drive.bicycle_id);
        const pay = calculateDrivePay(price, start_time);
        const minute = calculateTimeDifference(start_time);
        return { pay, minute };
    }
)

const getDriveRouteMap = async (drive, sequelize) => {
    let url = "https://maps.googleapis.com/maps/api/staticmap" +
        `?center=${drive.finish_lat},${drive.finish_lng}` +
        "&size=600x300" +
        "&maptype=roadmap" +
        `&markers=color:green%7Clabel:S%7C${drive.start_lat},${drive.start_lng}` +
        `&markers=color:red%7Clabel:F%7C${drive.finish_lat},${drive.finish_lng}` +
        "&key=AIzaSyAtuGsaesvaujVDFIm8D41nkxXJrKkSrPk"
    const { drive_coords } = sequelize.models;
    const driveRoute = await drive_coords.findAll({
        where: {
            drive_id: drive.id
        }
    })
    driveRoute.map(route => {
        url += `&markers=color:white%7C${route.lat},${route.lng}`
    })
    drive.map = url;
    drive.save();
}