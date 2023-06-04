import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Chat from "./component/Chat";
import Join from "./component/Join";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
