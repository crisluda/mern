import express from "express";
import {
  signUpUser,
  signInUser,
  signedInUser,
} from "../controllers/userController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";
const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.get("/me", protect, signedInUser);

export default router;
