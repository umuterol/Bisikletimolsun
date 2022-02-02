const { errorMessage, successMessage } = require("../../helpers/resMessage");

const db = require('../../models');
const model = db.wallet_transactions;
const Controller = require("../Controller");
const controller = new Controller(model);


const create = async (req, res, next) => {
    try {
        const data = await model.create(req.body, { res });
    } catch (error) {
        return errorMessage(res, error, 400);
    }
}

const getDataByPk = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await db.wallet.findByPk(id);

        if (!data) {
            return errorMessage(res, "Data not found by id", 400);
        }
        return successMessage(res, data);
    } catch (error) {
        return errorMessage(res, error, 400)
    }
};

module.exports = {
    create,
    getDataByPk,
}