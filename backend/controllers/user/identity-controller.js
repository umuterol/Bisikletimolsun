const asyncHandler = require("express-async-handler");

const db = require('../../models');
const model = db.identity;
const Controller = require("../Controller");
const controller = new Controller(model);



module.exports = {
    create: controller.create,
    getAllData: controller.getAllData,
    getDataByPk: controller.getDataByPk,
    updateData: controller.updateData,
    destroyData: controller.destroyData,
    getDataByQuery: controller.getDataByQuery,
    getDataByQueryOr: controller.getDataByQueryOr,
}