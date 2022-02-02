const express = require("express");
const router = express.Router();
const bicycleCoordsController = require("../../controllers/bicycle/bicycle-coords-controller");

router.post("/current", bicycleCoordsController.CreateOrUpdate);
router.get("/query", bicycleCoordsController.getDataByQuery);
router.get("", bicycleCoordsController.getAllData);
router.get("/:id", bicycleCoordsController.getDataByPk);


module.exports = router;