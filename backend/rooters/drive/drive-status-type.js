const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const driveStatusTypeController = require("../../controllers/drive/drive-status-type-controller");

router.get("", driveStatusTypeController.getAllData);

module.exports = router;