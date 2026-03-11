import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongouri = process.env.MONGOURI;

const connectDB = async () => {
  if (!mongouri) {
    throw new Error("MONGOURI is not set in the environment.");
  }

  mongoose.set("strictQuery", true);
  mongoose.set("bufferCommands", false);

  await mongoose.connect(mongouri, {
    serverSelectionTimeoutMS: 5000,
  });

  console.log("mongo connected");
};

export default connectDB;
