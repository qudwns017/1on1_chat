import { ADD_ROOM } from "../_actions/type";

// Action의 type에 따라 변화된 state 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  // 전의 state, 지금의 state
  switch (action.type) {
    case ADD_ROOM:
      return { ...state, addRoomSuccess: action.payload };
      break;
    default: // state가 들어오지 않았을 경우 전의 state를 넣어줌
      return state;
  }
}
