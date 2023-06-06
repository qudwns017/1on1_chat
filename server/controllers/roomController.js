const db = require("../models");
const { Room } = db;

module.exports = {
  get_room: async (req, res) => {
    console.log(req.body);
    res.send({ response: "I am room" }).status(200);
  },

  test: async (req, res) => {
    console.log(req.body);
  },

  create_room: async (req, res, next) => {
    try {
      {
        const createdRoom = await Room.create(req.body);
        console.log(req.body);

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
