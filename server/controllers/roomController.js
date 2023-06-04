const db = require("../models");
const { Room } = db;

module.exports = {
  get_room: async (req, res) => {
    res.send({ response: "I am alive" }).status(200);
  },

  create_room: async (req, res, next) => {
    try {
      {
        const createdRoom = await Room.create({ name: "cbj1" });

        // const addRoomPromise = createdRoom.addRoomUser(+UserId);
        // const addRoomUserPromise = createdRoom.addRoomUser(+req.body.id);

        // await Promise.allSettled([addRoomPromise, addRoomUserPromise]);

        // RoomId = createdRoom.id;
      }

      res.status(201).json({
        status: { ok: true },
        data: { message: "채팅방을 생성했습니다." },
      });
    } catch (error) {
      console.error("POST api/room >> ", error);
      next(error);
    }
  },
};
