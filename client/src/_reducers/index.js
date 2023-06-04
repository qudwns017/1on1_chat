import { combineReducers } from "redux";
import chat from "./chat_reducer.js";

const rootReducer = combineReducers({
  chat,
});

export default rootReducer;
