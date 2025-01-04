import express from "express";

import {
  LogOutHandler,
  userLoginHandler,
  myProfileFetchHandler,
  userRegisterHandler,
  userProfileFetchHandler,
  followAndUnfollowUserHandler,
} from "../controllers/usercontroller.js";
import { isAuth } from "../middlewares/isAuth.js";

const userrouter = express.Router();

userrouter.post("/register", userRegisterHandler);
userrouter.post("/Login", userLoginHandler);
userrouter.get("/Profile", isAuth, myProfileFetchHandler);
userrouter.post("/Logout", isAuth, LogOutHandler);
userrouter.get("/userprofile/:id", userProfileFetchHandler);
userrouter.post("/followAndUnfollow/:id", isAuth, followAndUnfollowUserHandler);

export default userrouter;
