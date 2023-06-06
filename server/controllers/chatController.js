const db = require("../models");
const { Chat } = db;

module.exports = {
  get_chat: async (req, res) => {
    console.log;
    res.send({ response: "I am chat" }).status(200);
  },

  create_chat: async (req, res, next) => {
    try {
      {
        const createdChat = await Chat.create({
          message: "cbj1233",
          name: "cbj",
          roomId: 3,
        });
        console.log(req.body);
      }

      res.status(201).json({
        status: { ok: true },
        data: { message: "채팅이 성공적으로 전송되었습니다." },
      });
    } catch (error) {
      console.error("POST api/chat >> ", error);
      next(error);
    }
  },
};
