const { errorMessage, successMessage } = require("../resMessage");

const bicycleCoordsBeforeUpdateHelper = async (sequelize, bicycle_coords) => {
    const { bicycle_id, lat, lng } = bicycle_coords;
    const { drive, drive_coords } = sequelize.models;
    const existingDrive = await isExistDriveThisBicycle(drive, bicycle_id);

    if (!existingDrive) {
        return;
    }

    try {
        await drive_coords.create({
            drive_id: existingDrive.id,
            bicycle_id,
            lat,
            lng,
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    bicycleCoordsBeforeUpdateHelper
}

const isExistDriveThisBicycle = async (drive, bicycle_id) => {
    try {
        const data = await drive.findOne({
            where: {
                bicycle_id,
                status: 'active'
            }
        })
        if (!data)
            return false;
        return data;
    } catch (error) {
        return false;
    }
}