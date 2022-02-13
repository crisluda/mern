import express from "express";
import {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} from "../controllers/goalController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

export default router;
