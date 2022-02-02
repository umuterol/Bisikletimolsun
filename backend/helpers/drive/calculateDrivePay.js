const { calculateTimeDifference } = require("../date");

const calculateDrivePay = (price, startTime) => {
    const pay = calculateTimeDifference(startTime) * price;
    const fixedPay = pay.toFixed(2);
    return parseFloat(fixedPay);
}

module.exports = calculateDrivePay;