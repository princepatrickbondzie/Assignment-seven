import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../Component/Login.css";

const fetchQuery = async ({ uri, method = "GET", body = null }) => {
  const response = await fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body !== null ? JSON.stringify(body) : null,
  });
  const data = await response.json();
  return data;
};

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  // const [error, setError] = useState(false);
  // const setAuthUser = useUserStore((state) => state.setAuthUser);
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (user.email === "" && user.password === "password") {
    //   setAuthUser(true);
    //   history.push("/protected");
    // } else {
    //   setError(true);
    // }

    const details = {
      email: user.email,
      password: user.password,
    };

    const data = fetchQuery({
      uri: "http://localhost:5000/auth/login",
      method: "POST",
      body: details,
    });
    localStorage.setItem("token", data.token);
    history.push("/");
  };
  return (
    <div className="body">
      <h1>Login Page</h1>
      {/* {error && <p>Email/Password invalid!</p>} */}
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          id="email"
          vlaue={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
