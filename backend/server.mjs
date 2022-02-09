import express from "express";
import dotenv from "dotenv";
import goals from "./routes/goalsRoutes.mjs";
import { errorHandler } from "./middleware/errorMiddleware.mjs";
const port = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goals);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
