const sendSms = require("../external-api/sms");

const identityBeforeUpdateHandler = async (identity) => {
    if (identity.changed('status') && identity.status === 'confirmed') {
        await sendSms(identity.phone, "Bisikletimolsun hesabınız doğrulandı. Sürüş yapmaya hazırsınız.")
    }
    if (identity.changed('status') && identity.status === 'blocked') {
        await sendSms(identity.phone, "Bisikletimolsun hesabınız bir süreliğine bloklandı. Daha detaylı bilgi için lütfen bizimle ilitişime geçin.")
    }
}

module.exports = {
    identityBeforeUpdateHandler,
}