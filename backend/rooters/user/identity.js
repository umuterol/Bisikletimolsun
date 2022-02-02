const express = require("express");
const router = express.Router();
const identityController = require("../../controllers/user/identity-controller");

router.post("/create", identityController.create);
router.get("/query", identityController.getDataByQuery);
router.get("/query-or", identityController.getDataByQueryOr);
router.delete("/delete/:id", identityController.destroyData);
router.put("/update/:id", identityController.updateData);
router.get("", identityController.getAllData);
router.get("/:id", identityController.getDataByPk);




module.exports = router;