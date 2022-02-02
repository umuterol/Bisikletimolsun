const express = require("express");
const router = express.Router();
const bicycleStatusTypeController = require("../../controllers/bicycle/bicycle-status-type-controller");

router.post("/create", bicycleStatusTypeController.create);
router.get("", bicycleStatusTypeController.getAllData);
router.put("/update/:id", bicycleStatusTypeController.updateData);
router.delete("/delete/:id", bicycleStatusTypeController.destroyData);

module.exports = router;