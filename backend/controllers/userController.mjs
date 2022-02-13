import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../model/userModel.mjs";

//@ desc Signup new user
//@ route POST /api/users
//@ access public
const signUpUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    fullName,
    email,
    password: hash,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Some thing want wrong");
  }
  res.json({ message: "Sign up User" });
});
//@ desc authenticate a user
//@ route POST /api/users/login
//@ access public
const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check for user
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Email or password is invalid");
  }
});
//@ desc Get user data
//@ route GET /api/users/me
//@ access public
const signedInUser = asyncHandler(async (req, res) => {
  const { _id, fullName, email } = await User.findById(req.user._id);
  res.status(200).json({ id: _id, "full name": fullName, email });
});
//generate JWT
const generateToken = (id) => {
  console.log(id);
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export { signUpUser, signInUser, signedInUser };
