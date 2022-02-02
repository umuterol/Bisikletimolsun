const express = require("express");
const router = express.Router();
const identityStatusTypeController = require("../../controllers/user/identity-status-type-controller");

router.post("/create", identityStatusTypeController.create);
router.get("", identityStatusTypeController.getAllData);
router.put("/update/:id", identityStatusTypeController.updateData);
router.delete("/delete/:id", identityStatusTypeController.destroyData);

module.exports = router;