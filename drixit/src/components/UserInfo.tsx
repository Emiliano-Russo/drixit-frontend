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
        const email = val.data.email;
        const password = val.data.password;
        setUser({ email, password });
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
      <h1>User Info</h1>
      {loading ? (
        <Spin></Spin>
      ) : (
        <div>
          <h2>{user?.email}</h2> <h2>{user?.password}</h2>
        </div>
      )}
    </div>
  );
}
