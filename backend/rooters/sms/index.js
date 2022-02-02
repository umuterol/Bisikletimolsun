const express = require("express");
const router = express.Router();

//controllers
const smsController = require("../../controllers/smsController")

router.get("/verify/:phoneNumber", smsController.verifyCode);

module.exports = router;