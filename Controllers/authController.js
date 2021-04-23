const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(email);
  // Check if all fields are present

  if ( !firstName || !lastName || !email || !password) {
    return res.status(400).send("Please provide all fields.");
  }

  //  Check if username/email is already in database
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send("Email already exists.");
  }

  //hashing of password
  const hashedPassword = await bcrypt.hash(password, 12);

  //Create user
  const user = await User.create({ email, username, password: hashedPassword });

  // Generate token
  const token = jwt.sign({ id: user._id }, "123456789", { expiresIn: "1h" });

  //return response
  res.status(201).json({ token });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Not Authorized." });
  }
  // next();
  token = token.split(" ")[1];

  try {
    let user = jwt.verify(token, "123456789");
    req.user = user.id;
    return next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
  // console.log(token);
  next();
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //check if user is in database
  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("Invalid Credentials");
  }

  // compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalid Credentials");
  }

  // Generate token
  const token = jwt.sign({ id: user._id }, "123456789", { expiresIn: "1h" });

  //return response
  res.status(200).json({ token });
};

module.exports = {
  register,
  login,
  verifyToken,
};
