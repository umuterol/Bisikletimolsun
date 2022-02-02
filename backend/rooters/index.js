const express = require("express");
const router = express.Router();
const Routes = require("./routers");

router.use("/bicycle", Routes.bicyleRoute);
router.use("/sms", Routes.smsRoute);
router.use("/user", Routes.userRoute);
router.use("/wallet", Routes.walletRoute);
router.use("/drive", Routes.driveRoute);

module.exports = router;