const { errorMessage, successMessage } = require("../../helpers/resMessage");
const db = require('../../models');
const model = db.drive_status_type;
const Controller = require("../Controller");
const controller = new Controller(model);

module.exports = {
    getAllData: controller.getAllData,
}