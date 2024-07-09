import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDB from "./src/db/index.js";
// for testing purspose
import { User } from "./src/model/user.js";
import { SignTime } from "./src/model/SignTimeSchema.js";
const app = express();

import authRouter from "./src/route/route.js";
import attendenceRouter from "./src/route/attendence.js";

// config dotnev
dotenv.config({
  path: "./.env",
});

// db connection
ConnectDB();
// midddleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/auth", authRouter);
app.use("/api/attendence", attendenceRouter);

// for testing purpose only
app.get("/", async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find().exec();

    const attendenceTime = await SignTime.find().populate("User").exec();

    // Render 'index.ejs' template and pass fetched data as variables
    // res.render("index", { users, attendenceTime });
    res.json({ users, attendenceTime });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send({ message: "Error fetching data", err });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is started at:${process.env.PORT}`);
});
