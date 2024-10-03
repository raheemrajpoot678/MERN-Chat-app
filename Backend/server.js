import express from "express";
import { configDotenv } from "dotenv";
import "colors";
import cookieParser from "cookie-parser";

// import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import messagesRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import { DB } from "./database/Db.js";
import { globalErrorController } from "./controllers/globle.error.controller.js";
import { app, server } from "./socket/socket.js";

configDotenv();

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://mern-chat-app-frontend-fawn.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No Content
  }

  next();
});

// app.use(cors());

app.use(express.json());
app.use(cookieParser());

// Set up routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/users", userRouter);

app.use(globalErrorController);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  DB();
  console.log(`Server running on port ${PORT}`.bgYellow);
});
