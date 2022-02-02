const startDrive = require("../drive/startDrive");
const finishDrive = require("../drive/finishDrive");
const { errorMessage } = require("../resMessage");

const driveTransactionAfterCreateHandler = async (sequelize, drive_transactions, options) => {
    const { transaction_type } = drive_transactions;
    const { req, res } = options;
    const { tc } = req.body;

    if (!await isConfirmedAccount(sequelize, tc)) {
        return errorMessage(res, "no driving allowed", 400);
    }

    if (transaction_type === 'started') {
        startDrive(req, res, sequelize, drive_transactions)
    } else if (transaction_type === 'finished') {
        finishDrive(req, res, sequelize, drive_transactions)
    }
}

module.exports = {
    driveTransactionAfterCreateHandler
}


const isConfirmedAccount = async (sequelize, tc) => {
    const { identity } = sequelize.models;
    const account = await identity.findByPk(tc);
    if (account.status === 'confirmed')
        return true;
    return false;
}
