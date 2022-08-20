import axios from "axios";
import { useEffect, useState } from "react";
import { Spin } from "antd";

interface User {
  email: string;
  password: string;
}

const url = "http://localhost:3010/api/v0/users/me";
const token =
  "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3IiwiaWF0IjoxNjYxMDE1OTAyfQ.PpXjCThsEEVWj1hT5JHse_fhwa5F6FMa--iyxtokGtM";

export function UserInfo() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const uri = url + token;

    axios
      .get(uri)
      .then((val) => {
        console.log("result: ", val);
        const email = val.data.email;
        const password = val.data.password;
        setUser({ email, password });
      })
      .catch((err) => {
        console.log("err", err);
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
