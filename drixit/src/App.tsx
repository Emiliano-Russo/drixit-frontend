import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Input } from "antd";
import "antd/dist/antd.css";

function isEmailValid(email: string): boolean {
  return true;
}

function App() {
  const [email, setEmail] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      console.log(email);
      setIsTyping(false);
    }, 500);
    return () => {
      clearTimeout(timeoutID);
    };
  });

  return (
    <div className="App">
      <h1>Login</h1>
      <h1>is typing: {isTyping ? "yes" : "no"}</h1>
      <Input
        placeholder="email"
        style={{ width: 300 }}
        value={email}
        onChange={(e) => {
          setIsTyping(true);
          setEmail(e.target.value);
        }}
      ></Input>
    </div>
  );
}

export default App;
