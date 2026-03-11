import express from "express"
import { login, logout, register, getProfile } from "../controllers/auth.controller.js"
import { AuthMiddleware } from "../middleware/Auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)
router.get("/profile", AuthMiddleware, getProfile)
export default router;
