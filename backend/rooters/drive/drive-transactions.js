const express = require("express");
const router = express.Router();
const driveTransactionsController = require("../../controllers/drive/drive-transactions-controller");

router.post("/create", driveTransactionsController.create);
router.get("/query", driveTransactionsController.getDataByQuery);
router.get("/query-or", driveTransactionsController.getDataByQueryOr);
router.get("/:id", driveTransactionsController.getDataByPk);
router.get("", driveTransactionsController.getAllData);

module.exports = router;