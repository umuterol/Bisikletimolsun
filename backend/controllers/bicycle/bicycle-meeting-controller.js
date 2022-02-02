const { errorMessage, successMessage } = require("../../helpers/resMessage");

const db = require('../../models');
const model = db.bicycle_add_meeting;
const Controller = require("../Controller");
const controller = new Controller(model);

const create = async (req, res) => {
    const { tc, price } = req.body;
    const imgUrl = `http://localhost:8080/image/${req.file.filename}`;
    try {
        const data = await model.create({
            tc,
            price,
            bicycle_img: imgUrl,
        })
        return successMessage(res, data);
    } catch (error) {
        console.log(error);
        errorMessage(res, error, 400);
    }
}


module.exports = {
    create,
    updateData: controller.updateData,
    getAllData: controller.getAllData,
    getDataByQuery: controller.getDataByQuery,
}