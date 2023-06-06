const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.post("/test", roomController.test);
router.post("/", roomController.get_room);
router.post("/create_room", roomController.create_room);

module.exports = router;
