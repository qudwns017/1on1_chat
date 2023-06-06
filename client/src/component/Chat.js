import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import io from "socket.io-client";
import { addChat } from "../_actions/chat_action";

import "./Chat.css";
import InfoBar from "./InfoBar/InfoBar";
import Messages from "./Messasges/Messages";
import TextContainer from "./TextContainer/TextContainer";
import Input from "./Input/Input";

const ENDPOINT = "http://localhost:5000";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  const onSubmitHander = (event) => {
    event.preventDefault();

    let body = {
      message: message,
      roomid: room,
      name: name,
    };

    dispatch(addChat(body)).then((response) => {
      if (response.payload.addChatSuccess) {
        console.log("메시지 전송 완료");
      } else {
        alert("메시지 전송에 실패했습니다.");
      }
    });
  };
  useEffect(() => {
    // 여기선 name과 room을 url에서 가져온다.
    // 이유는 setRoom과 setName이 적용되기 전에 socket.emit('join')이 실행되기 때문이다.
    // url에서 가져오는 방법이 아닌 다른 방법으로 name과 room을 가져오려면
    // 미리 정해진 방법으로 name과 room을 가져오는 것이 아닌
    // socket.emit('join')이 실행되기 전에 setRoom과 setName이 실행되도록 해야 한다.
    const { name, room } = queryString.parse(window.location.search);

    console.log(name, room);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      // console.log(message)
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      {/* <TextContainer users={users} /> */}
    </div>
  );
};

export default Chat;
