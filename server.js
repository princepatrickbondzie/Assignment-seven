const express = require("express");
const cors = require("cors");
require("./config/dbConnect");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routers/authRouter"));
app.use("/users", require("./routers/usersRouter"));

app.listen(5000, () => console.log("Login And Signup Page Ready"));
