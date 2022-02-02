const { successMessage, errorMessage } = require("../../helpers/resMessage");

const walletAfterCreateHandler = async (sequelize, wallet_transactions, options) => {
    const { res } = options;
    const { wallet } = sequelize.models;
    const { balance } = await wallet.findByPk(wallet_transactions.tc)
    let updatedTotal = wallet_transactions.transaction_amount;


    if (wallet_transactions.transaction_type === "add") {
        updatedTotal += balance;
        await addMoney(res, updatedTotal, wallet, wallet_transactions)
    } else if (wallet_transactions.transaction_type === "buy") {
        updatedTotal = balance - updatedTotal;
        await buy(updatedTotal, wallet, wallet_transactions)
    }

}


module.exports = {
    walletAfterCreateHandler,
}


const addMoney = async (res, updatedTotal, wallet, wallet_transactions) => {
    try {
        await wallet.update({
            balance: updatedTotal,
        }, {
            where: {
                tc: wallet_transactions.tc,
            }
        });
        wallet_transactions.status = 'successful';
        const data = { transaction: wallet_transactions, "wallet balance": updatedTotal }
        return successMessage(res, data, `${wallet_transactions.transaction_type} transaction successful`);
    } catch (error) {
        wallet_transactions.status = 'unsuccessful';
    }
}

const buy = async (updatedTotal, wallet, wallet_transactions,) => {
    if (updatedTotal < 0) {
        wallet_transactions.status = 'insufficient balance';
        return;
    }
    try {
        await wallet.update({
            balance: updatedTotal,
        }, {
            where: {
                tc: wallet_transactions.tc,
            }
        });
        wallet_transactions.status = 'successful';
    } catch (error) {
        wallet_transactions.status = 'unsuccessful';
        console.log(error);
    }
}