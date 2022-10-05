import express from "express";
import mongoose from "mongoose";

import { create, getAll, getOne, remove, update } from "./constrollers/PostController.js";
import * as UserController from "./constrollers/UserController.js";
import checkAuth from "./utils/checkAuth.js";
import { postCreateValidation, registerValidation } from "./validations.js";

mongoose
  .connect(
    "mongodb+srv://admin:12345q@cluster0.mkqqtge.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB - OK");
  })
  .catch((error) => console.log("DB - ERROR", error));

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!"); // Browser displays info
});

// User
app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);

// Posts
app.get("/posts", getAll);
app.get("/posts/:id", getOne);
app.post("/posts", checkAuth, postCreateValidation, create);
app.patch("/posts/:id", update);
app.delete("/posts/:id", checkAuth, remove);

// Launch server
app.listen(4444, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server OK");
});
