/* 
(4) reducer
: dispatch열차를 타고온 action의 type을 확인해서 그에 맞는 동작을 하는 곳
  reducer은 store의 state를 변경시켜야하기 때문에 state를 파라메터로 받고,
  dispatch를 타고온 action을 파라메터로 받아서 
  action의 type을 switch case문으로 조건을 걸어 동작
*/

import { ADD_CHAT } from "../_actions/type";

// Action의 type에 따라 변화된 state 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  // 전의 state, 지금의 state
  switch (action.type) {
    case ADD_CHAT:
      return { ...state, addChatSuccess: action.payload };
      break;
    default: // state가 들어오지 않았을 경우 전의 state를 넣어줌
      return state;
  }
}

// const onSubmitHandler = (event) => {
//   event.preventDefault();

//   if (Message.length === 0) {
//     alert("메시지를 입력해주세요.");
//     return;
//   }

//   let body = {
//     message: Message,
//     roomid: Room,
//     name: Name,
//   };

//   dispatch(addChat(body)).then((response) => {
//     if (response.payload.addChatSuccess) {
//       console.log("메시지 전송 완료");
//     } else {
//       alert("메시지 전송에 실패했습니다.");
//     }
//   });
// };
