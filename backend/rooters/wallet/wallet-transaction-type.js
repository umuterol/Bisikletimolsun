const express = require("express");
const router = express.Router();
const walletTransactionTypeController = require("../../controllers/wallet/wallet-transaction-type-controller");

router.post("/create", walletTransactionTypeController.create);
router.get("", walletTransactionTypeController.getAllData);
router.put("/update/:id", walletTransactionTypeController.updateData);
router.delete("/delete/:id", walletTransactionTypeController.destroyData);

module.exports = router;