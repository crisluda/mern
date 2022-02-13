import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import goals from "./routes/goalsRoutes.mjs";
import { errorHandler } from "./middleware/errorMiddleware.mjs";
import connectDB from "./database/db.mjs";
import user from "./routes/userRoutes.mjs";
const port = process.env.PORT || 5000;

const app = express();
dotenv.config();
connectDB();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goals);
app.use("/api/users", user);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
