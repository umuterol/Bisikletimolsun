const express = require("express");
const router = express.Router();
const walletController = require("../../controllers/wallet/wallet-transactions-controller");

router.post("/create", walletController.create);
router.get("/:id", walletController.getDataByPk);

module.exports = router;