const express = require("express");
const router = express.Router();

// Route
const driveTransactionRoute = require("./drive-transactions");
const driveRoute = require("./drive");
const driveStatusTypeRoute = require("./drive-status-type");

router.use("/transactions", driveTransactionRoute);
router.use("/status-type", driveStatusTypeRoute);
router.use("", driveRoute);


module.exports = router;