import axios from "axios";
import { ADD_CHAT } from "./type";

export function addChat(dataToSubmit) {
  const request = axios
    .post("/api/addchat", dataToSubmit)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: ADD_CHAT,
    payload: request,
  };
}
