const config = require("./config");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const cors = require("cors");
const roomRouter = require("./routes/room");
const chatRouter = require("./routes/chat");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const db = require("./models");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/room", roomRouter);
app.use("/chat", chatRouter);

// socket.io 동작
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log("유저이름 :11 " + user?.["id"]);

    if (error) callback({ error: "에러가 발생했습니다." });

    socket.emit("message", {
      user: "admin",
      text: `${user?.name}, ${user?.room}에 오신 것을 환영합니다.`,
    });
    // socket.broadcast.to(user.room).emit('message', {
    //   user: 'admin',
    //   text: `${user.name}님이 가입하셨습니다.`,
    // })
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    socket.join(user.room);
    callback();
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(`${user.name} : "${message}"`);
    // console.log(typeof message, message)
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
    });
    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name}님이 퇴장하셨습니다.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
    console.log("유저가 나갔습니다.");
  });
});

db.sequelize
  .sync({ force: false }) // 서버 실행시 MySQL 과 연동되도록 하는 sync 메서드
  // force : true 로 해놓으면 서버 재시작마다 테이블이 재생성됨. 테이블을 잘못 만든 경우에 true 로 설정
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

server.listen(5000, () =>
  console.log(`서버가 ${config.port} 에서 시작되었어요`)
);

app.post("/user", (req, res) => {
  // body 출력
  console.log(req.body);
  res.send("ok!!!");
});
