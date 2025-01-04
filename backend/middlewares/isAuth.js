import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({
        massage: "please Log in",
      });
    }
    const decodedData = jwt.verify(token, process.env.jwt_secret);
    if (!decodedData) {
      return res.status(403).json({
        massage: "your token is expired",
      });
    }
    const id = decodedData.id;
    req.user = await User.findById(id);
    next();
  } catch (error) {
    res.status(203).json({
      massage: "Login ",
    });
  }
};
