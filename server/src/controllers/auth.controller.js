import { TokenBlackList } from "../models/TokenBlackList.model.js";
import { User } from "../models/User.model.js";
import { generateToken } from "../utils/generateToken.js"

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields are required" })
    }
    const isUser = await User.findOne({ email })
    if (isUser) {
      return res.status(400).json({ message: "user is already exists" })
    }
    const user = await User.create({
      name, email, password
    })
    generateToken(user._id, res);
    return res.status(201).json({
      message: "user registered successfully", user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" })
    }
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    const isPasswordMatch = await isUser.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    generateToken(isUser._id, res)
    return res.status(200).json({
      message: "user logged in successfully", user: {
        _id: isUser._id,
        name: isUser.name,
        email: isUser.email
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "no token provided" })
    }
    if (token) {
      await TokenBlackList.create({ token })
    }
    res.clearCookie("token", {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0
    })
    return res.status(200).json({ message: "user logged out successfully" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
