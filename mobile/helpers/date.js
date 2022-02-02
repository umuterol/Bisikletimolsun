export const nowDate = () => {
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours() + 3, date.getUTCMinutes(), date.getUTCSeconds());

    return new Date(now_utc);
}

export const calculateTimeDifference = (startTime) => {
    const second = (nowDate() - startTime) / 1000;
    const m = parseInt(second / 60);
    const s = second % 60;
    return { m, s }
}