const express = require("express");
const router = express.Router();

//Route
const identityRoute = require("./identity");
const identityStatusTypeRouter = require("./identity-status-type");

router.use("/identity", identityRoute);
router.use("/identity-status-type", identityStatusTypeRouter);


module.exports = router;