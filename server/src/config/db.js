import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("mongodb connected")
    })
    mongoose.connection.on("disconnected", () => {
      console.log("mongodb disconnected")
    })
    mongoose.connection.on("error", (error) => {
      console.error("mongodb connection error:", error.message)
    })
    if (!ENV.MONGO_URI) {
      console.log("no uri found in env file")
    }
    await mongoose.connect(ENV.MONGO_URI, {
      dbName: "TaskBoard"
    })
  } catch (error) {
    console.log(error)
  }
}