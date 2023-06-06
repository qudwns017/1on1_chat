import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRoom } from "../_actions/room_action";

import "./Join.css";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("작동");

    let body = {
      name: room,
    };

    // 방생성은 잘 되는데 이상하게 콘솔은 실패로 뜸
    dispatch(addRoom(body)).then((response) => {
      if (response.payload.code === 200 || response.payload.code === 201) {
        console.log("방 생성 완료");
        navigate(`/chat?name=${name}&room=${room}`);
      } else {
        console.log("방 생성에 실패했습니다.");
        navigate(`/chat?name=${name}&room=${room}`);
      }
    });
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading"></h1>
          <div>
            <input
              placeholder="이름"
              className="joinInput"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="채팅방"
              className="joinInput mt-20"
              type="text"
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
          <button
            className="button mt-20"
            type="submit"
            disabled={!name || !room}
          >
            가입
          </button>
        </div>
      </div>
    </form>
  );
}

export default Join;
