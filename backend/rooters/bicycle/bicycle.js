const express = require("express");
const router = express.Router();
const bicycleController = require("../../controllers/bicycle/bicycle-controller");


router.post("/create", bicycleController.create);
router.get("/query", bicycleController.getDataByQuery);
router.get("/query-or", bicycleController.getDataByQueryOr);
router.delete("/delete/:id", bicycleController.destroyData);
router.put("/update/:id", bicycleController.updateData);
router.get("/by-coords", bicycleController.getAllBicyclesWithCoords);
router.get("", bicycleController.getAllData);
router.get("/:id", bicycleController.getDataByPk);


module.exports = router;