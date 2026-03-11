import express from "express";
import { createTask, getTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller.js"
import { AuthMiddleware } from "../middleware/Auth.middleware.js";
const router = express.Router()

router.use(AuthMiddleware)
router.post("/", createTask)
router.get('/', getTasks)
router.get('/:id', getTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)
export default router
