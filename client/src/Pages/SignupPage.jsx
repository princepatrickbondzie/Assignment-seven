import { useState } from "react";
import "../Component/Login.css";
import { useHistory } from "react-router-dom";

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

const SignupPage = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    list: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user.firstName);
    console.log(user.lastName);
    console.log(user.list);
    console.log(user.password);

    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      list: user.list,
      password: user.password,
    };

    const data = fetchQuery({
      uri: "http://localhost:5000/auth/register",
      method: "POST",
      body: newUser,
    });
    localStorage.setItem("token", data.token);
    history.push("/login");
  };
  return (
    <div className="body">
      <h1>Signup Page</h1>
      {/* {error && <p>Email/Password invalid!</p>} */}
      <form action="" onSubmit={handleSubmit} id="fm">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          id="in"
          value={user.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          id="in"
          value={user.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          id="in"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="text"
          list="in2"
          name="list"
          value={user.list}
          onChange={handleChange}
          placeholder="Where do you classify yourself in the list below?"
        />
        <datalist id="in2">
          <option value="Student" />
          <option value="Parent" />
          <option value="Publisher" />
          <option value="Retailer" />
          <option value="Wholeseller" />
          <option value="Other" />
        </datalist>
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="in"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignupPage;
