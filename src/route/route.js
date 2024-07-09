import express from "express";
import { User } from "../model/user.js";
const route = express.Router();

// register users
route.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send({
        isAlreadyUser: true,
        message: "you are already user",
        data: user,
      });
      return; // Added return to exit function early
    }

    const register = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
    });

    const newUser = await register.save();
    res.send({ created: true, data: newUser });
  } catch (err) {
    console.error("Error in registration:", err);
    res.send({ created: false, error: err.message });
  }
});

// login users

route.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      res.send({ data: user });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send({ message: "Login failed", error: error.message });
  }
});

// get app users information
route.get("/allUser", async (req, res) => {
  try {
    const users = await User.find();
    res.send({ users });
  } catch (error) {
    console.error("Error in fetching users:", error);
    res
      .status(500)
      .send({ message: "Failed to fetch users", error: error.message });
  }
});

export default route;
