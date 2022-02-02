const express = require("express");
const router = express.Router();

//Route
const bicycleRoute = require("./bicycle");
const bicyleCoordsRoute = require("./bicycle-coords");
const bicycleStatusTypeRoute = require("./bicycle-status-type");
const bicycleMeetingRoute = require("./bicycle-meeting");


router.use("/coords", bicyleCoordsRoute);
router.use("/status-type", bicycleStatusTypeRoute);
router.use("/meeting", bicycleMeetingRoute);
router.use("", bicycleRoute);


module.exports = router;