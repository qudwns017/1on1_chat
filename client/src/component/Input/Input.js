import React from "react";

import "./Input.css";

const Input = ({ setMessage, sendMessage, message }) => (
  <div className="form">
    <input
      className="input"
      type="text"
      placeholder="전송하려는 메시지를 입력하세요."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
  </div>
);

export default Input;
