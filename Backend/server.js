import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import "colors";
import cookieParser from "cookie-parser";
// Remove the cors import
// import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import messagesRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import { DB } from "./database/Db.js";
import { globalErrorController } from "./controllers/globle.error.controller.js";
import { app, server } from "./socket/socket.js";

configDotenv();

const __dirname = path.resolve();

// Remove CORS middleware
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Set up routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/users", userRouter);

// Enable pre-flight across-the-board is no longer needed
// app.options("*", cors());

app.use(globalErrorController);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  DB();
  console.log(`Server running on port ${PORT}`.bgYellow);
});
