const db = require('../../models');
const model = db.identity_status_type;
const Controller = require("../Controller");
const controller = new Controller(model);



module.exports = {
    create: controller.create,
    getAllData: controller.getAllData,
    updateData: controller.updateData,
    destroyData: controller.destroyData,
}