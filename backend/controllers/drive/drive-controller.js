const { errorMessage, successMessage } = require("../../helpers/resMessage");
const db = require('../../models');
const model = db.drive;
const Controller = require("../Controller");
const controller = new Controller(model);

const getByActiveDrive = async (req, res) => {
    const { tc } = req.params;
    try {
        const activeDrive = await model.findOne({
            where: {
                tc,
                status: 'active',
            }
        });

        if (!activeDrive) {
            return errorMessage(res, "you don't have active driving", 400);
        }
        return successMessage(res, activeDrive);
    } catch (error) {
        return errorMessage(res, error, 400)
    }
}

const getRoute = async (req, res) => {
    const drive_id = req.params.id;
    try {
        const data = await db.drive_coords.findAll({
            where: {
                drive_id,
            }
        })
        return successMessage(res, data);
    } catch (error) {
        return errorMessage(res,error,400);
    }
}

module.exports = {
    getAllData: controller.getAllData,
    getDataByPk: controller.getDataByPk,
    getDataByQuery: controller.getDataByQuery,
    getDataByQueryOr: controller.getDataByQueryOr,
    getByActiveDrive,
    getRoute,
}