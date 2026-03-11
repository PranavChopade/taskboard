import dotenv from "dotenv"
dotenv.config();
import app from "./src/app.js"
import { connectDB } from "./src/config/db.js"
import { ENV } from "./src/config/env.js";

connectDB();

const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on port", + PORT)
})