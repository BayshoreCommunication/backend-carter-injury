// Imports
import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/routeNames.js";
import connectDB from "./database/connection.js";

// Configurations
dotenv.config();

// App setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// Database connection
connectDB();

//test Routes
app.get("/", (req, res) => {
  return res.status(200).json({ success: "response from get api" });
});

// Server setup
const server = http.createServer(app);
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server run at ${port}`);
});
