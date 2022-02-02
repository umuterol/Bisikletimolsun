const axios = require('axios');
const asyncHandler = require("express-async-handler");

const SMS_API_ID = process.env.SMS_API_ID;
const SMS_API_KEY = process.env.SMS_API_KEY;
const SMS_API_URL = process.env.SMS_API_URL;
const SMS_API_SENDER = process.env.SMS_API_SENDER;


const sendSms = asyncHandler(async (phoneNumber, message) => {

    const data = JSON.stringify({
        "api_id": SMS_API_ID,
        "api_key": SMS_API_KEY, //Size özel verilmiş olan api keyi
        "sender": SMS_API_SENDER, //Gönderici adı
        "message_type": "normal", //türkçe sms göndermek için turkce yaziniz
        "message": message,
        "phones": [
            phoneNumber,
        ], //Telefon numaralarını , ile ayırarak ekleyebilirsiniz.
    });

    const config = {
        method: 'post',
        url: SMS_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    const response = await axios(config)
    return response.data;
}
)


module.exports = sendSms;