import axios from "axios";
import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { User } from "../types/User.interface";
import { config } from "../routes";
import { useLocation } from "react-router-dom";

interface LocationState {
  jwt: string;
}

export function UserInfo() {
  const location = useLocation();
  const state = location.state as LocationState;
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  function getToken() {
    if (state == null) return localStorage.getItem("token");
    else return state.jwt;
  }

  useEffect(() => {
    const token = getToken();
    if (token == null) {
      message.error("token not available");
      setLoading(false);
      return;
    }
    const uri = config.userInfoRoute + "?token=" + token;

    axios
      .get(uri)
      .then((val) => {
        const user = val.data as User;
        setUser(user);
      })
      .catch((err) => {
        console.log("err", err);
        message.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>User Information</h1>
      {loading ? (
        <Spin></Spin>
      ) : (
        <div
          style={{
            padding: "20px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            width: "max-content",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2>
            <strong>Name: </strong>
            {user?.name} {user?.lastName}
          </h2>
          <h2>
            <strong>DNI: </strong>
            {user?.dni}
          </h2>
          <h2>
            <strong>Email: </strong>
            {user?.email}
          </h2>
        </div>
      )}
    </div>
  );
}
