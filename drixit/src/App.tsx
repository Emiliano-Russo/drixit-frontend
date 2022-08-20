import "./App.css";
import "antd/dist/antd.css";
import { Login } from "./components/Login";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { UserInfo } from "./components/UserInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user-info" element={<UserInfo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
