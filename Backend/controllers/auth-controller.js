const User = require("../models/user-model");
const customError = require("../utils/error");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  let hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(customError(404, "User not found"));
    }
    const match = bcryptjs.compareSync(password, user.password);
    if (!match) {
      return next(customError(401, "Wrong credentials!"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = user._doc;
             
    let expiryDate = new Date(Number(new Date()) + 60 * 60 * 1000); // 1 hour from now
    res
      .cookie("token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
    //{httpOnly:true} prevents access to the token from the client side third party app also
  } catch (error) {
    next(error);
  }
};

const googleOAuth = async (req, res, next) => {
  const { name, email, photoURL } = req.body;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      let expiryDate = new Date(Number(new Date()) + 60 * 60 * 1000); // 1 hour from now
      res
        .cookie("token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
      await user.save();
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 1000).toString(),
        email,
        password: hashedPassword,
        profilePicture: photoURL,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword1, ...rest } = newUser._doc;
      let expiryDate = new Date(Number(new Date()) + 60 * 60 * 1000); // 1 hour from now
      res
        .cookie("token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Signout successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = { signup, signin, googleOAuth, signOut };
