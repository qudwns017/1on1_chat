import axios from "axios";
import { ADD_ROOM } from "./type";

export function addRoom(dataToSubmit) {
  const request = axios
    // 앞에 5000 지정 안해주면 port 번호 3000으로 날아감
    .post("http://localhost:5000/room/create_room", dataToSubmit)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: ADD_ROOM,
    payload: request,
  };
}
