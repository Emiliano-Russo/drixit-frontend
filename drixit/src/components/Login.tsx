import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [touchedInput, setTouchedInput] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [nextTouched, setNextTouched] = useState<boolean>(false);

  function isEmailValid(email: string): boolean {
    return email.includes("@") && !email.includes(" ") && email.includes(".");
  }

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setIsTyping(false);
      const result = isEmailValid(email);
      setEmailValid(result);
    }, 500);
    return () => {
      clearTimeout(timeoutID);
    };
  });

  function login() {
    axios
      .post("http://localhost:3010/api/v0/authenticate", {
        email: email,
        password: password,
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <Input
        disabled={nextTouched}
        placeholder="Email"
        style={{ width: 300 }}
        value={email}
        onChange={(e) => {
          if (e.target.value.length === 0) setTouchedInput(false);
          else setTouchedInput(true);
          setIsTyping(true);
          setEmail(e.target.value);
        }}
        suffix={
          nextTouched ? (
            <Button
              type="text"
              style={{ color: "green" }}
              onClick={() => {
                setNextTouched(false);
              }}
            >
              Change
            </Button>
          ) : touchedInput ? (
            isTyping ? (
              <Spin size="small" />
            ) : emailValid ? (
              <CheckOutlined style={{ color: "green" }} />
            ) : (
              <CloseOutlined style={{ color: "red" }} />
            )
          ) : (
            <></>
          )
        }
      ></Input>
      <br></br>

      <Input
        hidden={!nextTouched}
        placeholder="Password"
        style={{ marginTop: 10 }}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></Input>

      <Button
        hidden={!emailValid || nextTouched}
        style={{ marginTop: 10 }}
        onClick={() => setNextTouched(true)}
      >
        Next
      </Button>
      <Button
        onClick={login}
        hidden={!nextTouched}
        disabled={password.length == 0}
        style={{ marginTop: 10 }}
      >
        Login
      </Button>
    </div>
  );
}
