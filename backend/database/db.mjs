import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Mongodb is connected: ${conn.connection.host}`.green.underline
    );
  } catch (error) {
    console.log(`${error}`.red.underline);
    process.exit(1);
  }
};
export default connectDB;
