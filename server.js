// Imports
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import connectDB from "./database/connection.js";
import router from "./routes/routeNames.js";

// Configurations
dotenv.config();

// App setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

//test Routes
app.get("/", (req, res) => {
  return res.status(200).json({ success: "response from get api" });
});

// Server setup
const server = http.createServer(app);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`server run at ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

start();
