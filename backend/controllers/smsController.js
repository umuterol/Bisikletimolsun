const asyncHandler = require("express-async-handler");
const sendSms = require("../helpers/external-api/sms");
const smsHelper = require("../helpers/smsHelper");

const verifyCode = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.params;
    const randomCode = smsHelper.randomVerifyCode().toString();
    const sendSmsData = await sendSms(phoneNumber, "Bisikletimolsun doğrulama kodu: " + randomCode)

    if (sendSmsData.status === 'success')
        return res
            .status(200)
            .json({
                status: true,
                message: sendSmsData.description,
                data: randomCode,
            })
    return res
        .json({
            status: false,
            message: 'başarısız'
        })
})


module.exports = {
    verifyCode,
}