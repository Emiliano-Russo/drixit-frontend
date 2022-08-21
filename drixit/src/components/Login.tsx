import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, message, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../myconfig";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [touchedInput, setTouchedInput] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [nextTouched, setNextTouched] = useState<boolean>(false);
  const navigate = useNavigate();

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
      .post(config.loginRoute, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        navigate("/user-info", { state: { jwt: res.data.jwt } });
      })
      .catch((err) => {
        message.error(err.response.data);
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
