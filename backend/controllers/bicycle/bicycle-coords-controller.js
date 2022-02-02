const { errorMessage, successMessage } = require("../../helpers/resMessage");

const db = require('../../models');
const model = db.bicycle_coords;
const Controller = require("../Controller");
const controller = new Controller(model);


const CreateOrUpdate = async (req, res) => {
    const { bicycle_id } = req.body;
    let data = await model.findOne({ where: { bicycle_id } })

    try {
        if (!data) {
            data = await model.create(req.body)
        } else {
            await data.update(req.body)
        }
        return successMessage(res, data);
    } catch (error) {
        console.log(error)
        return errorMessage(res, error, 400);
    }

}

const getAllData = async (req, res) => {
    try {
        const data = await model.findAll({
            include: db.bicycle
        });
        if (data.length === 0) {
            return errorMessage(res, "No data found.", 400)
        }
        return successMessage(res, data);
    } catch (error) {
        return errorMessage(res, error, 400)
    }
};

module.exports = {
    CreateOrUpdate,
    getAllData,
    getDataByPk: controller.getDataByPk,
    getDataByQuery: controller.getDataByQuery,
}