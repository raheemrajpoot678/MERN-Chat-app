import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import "colors";
import cookieParser from "cookie-parser";
<<<<<<< HEAD
=======
// Remove the cors import
>>>>>>> 9211abdd63e8cc4277920ce69637e49cfabb01d7
// import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import messagesRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import { DB } from "./database/Db.js";
import { globalErrorController } from "./controllers/globle.error.controller.js";
import { app, server } from "./socket/socket.js";

configDotenv();

const __dirname = path.resolve();

<<<<<<< HEAD
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: ["https://mern-chat-app-frontend-fawn.vercel.app"], // Allow only your frontend
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // Allow credentials (cookies, authorization headers)
//   })
// );
=======
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use(express.json());
app.use(cookieParser());
>>>>>>> 9211abdd63e8cc4277920ce69637e49cfabb01d7

// Set up routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/users", userRouter);

app.options("*", cors());

app.use(globalErrorController);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  DB();
  console.log(`Server running on port ${PORT}`.bgYellow);
});
