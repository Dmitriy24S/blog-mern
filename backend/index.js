import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import { create, getAll, getOne, remove, update } from "./constrollers/PostController.js";
import * as UserController from "./constrollers/UserController.js";
import checkAuth from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import { loginValidation, postCreateValidation, registerValidation } from "./validations.js";

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

// Image upload handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
    // save to folder -> uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // file name
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads")); // express check if receive request for upload -> check if already have in folder -> if yes? show it in browser

// Image upload
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    // return to client which address saved image (req.file = from middleware access image)
    url: `uploads/${req.file.originalname}`,
  });
});

// User
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register);
app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);

// Posts
app.get("/posts", getAll);
app.get("/posts/:id", getOne);
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, create);
app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, update);
app.delete("/posts/:id", checkAuth, remove);

// Launch server
app.listen(4444, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server OK");
});
