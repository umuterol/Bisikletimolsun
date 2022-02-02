const errorMessage = (res, message, status) => {
    return res
        .status(status)
        .json({
            success: false,
            message,
        })
}
const successMessage = (res, data, message = "request successful.", status = 200) => {
    return res
        .status(status)
        .json({
            success: true,
            message,
            data,
        })
}
module.exports = {
    errorMessage,
    successMessage,
};