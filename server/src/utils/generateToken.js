import { ENV } from "../config/env.js"
import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      secure: ENV.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "strict"
    })
  } catch (error) {
    console.log(error)
  }
}
