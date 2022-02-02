const nowDate = () => {
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours() + 3, date.getUTCMinutes(), date.getUTCSeconds());

    return new Date(now_utc);
}

const calculateTimeDifference = (startTime) => {
  return Math.ceil((nowDate() - startTime) / 60000)
}

module.exports = {
    nowDate,
    calculateTimeDifference,
}