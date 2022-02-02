const express = require("express");
const router = express.Router();

//Route
const walletTransactionTypeRoute = require("./wallet-transaction-type");
const walletTransactionsRoute = require("./wallet-transactions");

router.use("/transaction-type", walletTransactionTypeRoute);
router.use("", walletTransactionsRoute);

module.exports = router;