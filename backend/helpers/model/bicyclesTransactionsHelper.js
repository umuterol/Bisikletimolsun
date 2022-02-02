const asyncHandler = require("express-async-handler");
const { successMessage, errorMessage } = require("../../helpers/resMessage");

const bicyclesTransactionsBeforeCreateHelper = async (sequelize, bicycles_transactions, options) => {
    const { transaction_type, id } = bicycles_transactions;
    if (transaction_type === 'mining') {
        const status = await miningHandler(sequelize, bicycles_transactions);
        if (status)
            bicycles_transactions.status = 'successful'
        else
            bicycles_transactions.status = 'unsuccessful'

    } else if (transaction_type === 'withdraw') {
        const status = await withdrawHandler();
    }
}

module.exports = {
    bicyclesTransactionsBeforeCreateHelper,
};

const miningHandler = asyncHandler(
    async (sequelize, bicycles_transactions) => {
        const { bicycle } = sequelize.models;
        const DRIVE_COMMISSION = parseFloat(process.env.DRIVE_COMMISSION)
        const amount = bicycles_transactions.transaction_amount;
        const bicycleData = await bicycle.findByPk(bicycles_transactions.bicycle_id);
        const { total_earn, user_earn } = bicycleData;
        const updateTotalEarn = total_earn + amount;
        const updateUserEarn = user_earn + (amount * (1 - DRIVE_COMMISSION))

        try {
            await bicycleData.update({
                total_earn: updateTotalEarn,
                user_earn: updateUserEarn,
            })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }
)

const withdrawHandler = asyncHandler(
    async () => {
        
    }
)