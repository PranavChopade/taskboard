import mongoose from "mongoose";
const tokenBlackListSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  }
}, { timestamps: true })

export const TokenBlackList = mongoose.model("TokenBlackList", tokenBlackListSchema)