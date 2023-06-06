import axios from "axios";
import { ADD_CHAT } from "./type";

export function addChat(dataToSubmit) {
  const request = axios
    .post("/chat/create_chat", dataToSubmit)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: ADD_CHAT,
    payload: request,
  };
}
