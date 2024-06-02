const User = require("../models/userModel.js");
const { createSecretToken } = require("../utils/secretToken");

module.exports.Register = async (req, res, next) => {
  try {
    const { userName, password, createdAt } = req.body;
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ userName, password, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName })
    if (!user) {
      return res.json({ message: "Incorrect Username or Password"});
    }
    if (password !== user.password) {
      return res.json({ message: "Incorrect Username or Password"});
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false
    });
    res.status(201).json({ message: "User logged in Successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
}