const express = require("express");
const router = express.Router();
const driveController = require("../../controllers/drive/drive-controller")

router.get("/query", driveController.getDataByQuery);
router.get("/query-or", driveController.getDataByQueryOr);
router.get("/my-active/:tc", driveController.getByActiveDrive);
router.get("/route/:id", driveController.getRoute)
router.get("/:id", driveController.getDataByPk);
router.get("", driveController.getAllData);

module.exports = router;