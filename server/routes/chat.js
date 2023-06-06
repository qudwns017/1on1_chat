const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/", chatController.get_chat);
router.post("/create_chat", chatController.create_chat);

module.exports = router;
