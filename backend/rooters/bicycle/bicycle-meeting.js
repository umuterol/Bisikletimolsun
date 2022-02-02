const express = require("express");
const router = express.Router();
const bicycleMeetingController = require("../../controllers/bicycle/bicycle-meeting-controller");
const multer = require("multer");
const path = require("path");


// storage engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
})

router.post("", upload.single('bicycle'), bicycleMeetingController.create)
router.put("/update/:id", bicycleMeetingController.updateData)
router.get("", bicycleMeetingController.getAllData)
router.get("/query", bicycleMeetingController.getDataByQuery)

module.exports = router;