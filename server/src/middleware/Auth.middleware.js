import { ENV } from "../config/env.js";
import { TokenBlackList } from "../models/TokenBlackList.model.js";
import jwt from "jsonwebtoken";

export const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" })
    }
    const isTokenBlackListed = await TokenBlackList.findOne({ token });
    if (isTokenBlackListed) {
      return res.status(401).json({ message: "Invalid token" })
    }
    const decoded = await jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" })
    }
    req.user = decoded
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
