import asyncHandler from "express-async-handler";
import Goal from "../model/goalModel.mjs";
import User from "../model/userModel.mjs";
// import goalJoi from '../joi/goalJoi.mjs';

//@ desc Get goals
//@ route GET /api/goals
//@ access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//@ desc Set goals
//@ route POST /api/goals
//@ access Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error(`Please add a text`);
  }
  console.log(req.user);
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.json(goal);
});

//@ desc Update goals
//@ route PUT /api/goals/:id
//@ access Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new error("Goal not find");
  }
  //check user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //make sure logged in user match the goals
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//@ desc Delete goals
//@ route DELETE /api/goals/:id
//@ access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  console.log(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not find");
  }

  //check user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //make sure logged in user match the goals
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deleteGoal = await Goal.findByIdAndRemove(req.params.id);
  res.status(200).json(deleteGoal);
});

export { getGoals, setGoals, updateGoals, deleteGoals };
