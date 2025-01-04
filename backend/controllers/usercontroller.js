import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import genratejwt from "../utils/genrateJwtToken.js";

dotenv.config();

export const userRegisterHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let user = await User.findOne({ email }).select("-password");

    if (user) {
      return res.status(400).json({
        message: "User already has an account",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });
    genratejwt(user._id, res);
    res.status(201).json({
      user,
      message: "User is registered",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        massage: "all fields are required",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(402).json({
        massage: "user doesn't exits with this email ",
      });
    }
    const status = await bcrypt.compare(password, user.password);
    if (!status) {
      return res.status(402).json({
        massage: "wrong email or password",
      });
    }
    genratejwt(user._id, res);
    const sendinguser = await User.findOne({ email }).select("-password");
    res.status(200).json({
      user: sendinguser,
      massage: "Logged in !",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      massage: "something went wrong",
      erro: error.massage,
    });
  }
};

export const myProfileFetchHandler = async (req, res) => {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid).select("-password");
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      massage: "something went wrong",
    });
  }
};

export const LogOutHandler = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({
      massage: "Logged out !",
    });
  } catch (error) {
    res.status(500).json({
      massage: "something went wrong",
    });
  }
};

export const userProfileFetchHandler = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(404).json({
      massage: "something went wrong",
    });
  }
};

export const followAndUnfollowUserHandler = async (req, res) => {
  /* 1 -  find id of login user and user 
     2 - check if he is trying to follow oneself 
     3-  then fine the index of following id of login and follower of user 
     4-  remove id from login following and user follower list
     5- save the changess in database */

  try {
    const logedInUser = await User.findById(req.user._id);
    const user = await User.findById(req.params.id);

    if (logedInUser._id.toString() === user._id.toString()) {
      return res.status(402).json({
        massage: "you can't follow yourself !",
      });
    }
    if (user.followers.includes(logedInUser._id)) {
      try {
        const userIndex = user.followers.indexOf(logedInUser._id);
        const loginUserIndex = logedInUser.following.indexOf(user._id);

        user.followers.splice(userIndex, 1);
        logedInUser.following.splice(loginUserIndex, 1);

        await user.save();
        await logedInUser.save();
        res.status(200).json({
          massage: "Unfollowed!",
        });
      } catch (error) {
        res.status(200).json({
          massage: "error",
          error: error.massage,
        });
      }
    } else {
      user.followers.push(logedInUser._id);
      logedInUser.following.push(user._id);
      await user.save();
      await logedInUser.save();
      res.status(200).json({
        massage: "User Followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      massage: "Something went wrong",
    });
  }
};
