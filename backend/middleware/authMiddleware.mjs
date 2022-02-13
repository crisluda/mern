import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/userModel.mjs";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("====================================");
      console.log(token);
      console.log("====================================");

      // verify token
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized1");
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized2");
    }
  }
});
export { protect };
