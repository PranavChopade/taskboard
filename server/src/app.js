import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import limiter from "./utils/rateLimiter.js";
import taskRoutes from "./routes/task.routes.js"
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(limiter)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/task", taskRoutes)

export default app
