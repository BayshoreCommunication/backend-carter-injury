import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongouri = process.env.MONGOURI;
const connectDB = () => {
  mongoose
    .connect(mongouri)
    .then((result) => {
      console.log("mongo connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
