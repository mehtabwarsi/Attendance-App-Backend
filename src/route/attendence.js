import express from "express";
import { SignTime } from "../model/SignTimeSchema.js";
const route = express.Router();

// signIn and Sign out times

route.post("/signin", (req, res) => {
  const newSignIn = new SignTime({ type: "sign-in" });
  newSignIn
    .save()
    .then((signIn) => res.send(`Sign-in recorded at ${signIn.time}`))
    .catch((err) => res.status(500).send("Error recording sign-in"));
});

// Route to handle sign-out request
route.post("/signout", (req, res) => {
  const newSignOut = new SignTime({ type: "sign-out" });
  newSignOut
    .save()
    .then((signOut) => res.send(`Sign-out recorded at ${signOut.time}`))
    .catch((err) => res.status(500).send("Error recording sign-out"));
});

export default route
