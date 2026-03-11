import { Task } from "../models/Task.model.js"

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate, status = "todo" } = req.body;
    const { userId: createdBy } = req.user;

    if (!title || !description || !assignedTo || !dueDate) {
      return res.status(400).json({ message: "all fields are required" })
    }
    const task = await Task.create({
      title,
      description,
      dueDate,
      assignedTo,
      createdBy,
      status
    })
    res.status(201).json({
      message: "task has been created & assigned", task: {
        _id: task._id,
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        createdBy: task.createdBy,
        status: task.status,
        dueDate: task.dueDate
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ message: "task not found" })
    }
    res.status(200).json({
      message: "task fetched", task: {
        _id: task._id,
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        createdBy: task.createdBy,
        status: task.status,
        dueDate: task.dueDate
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const tasks = await Task.find({
      $or: [{ createdBy: userId }, { assignedTo: userId }]
    }).sort({ dueDate: 1 })

    res.status(200).json({
      message: "tasks fetched successfully",
      tasks: tasks.map(task => ({
        _id: task._id,
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        createdBy: task.createdBy,
        status: task.status,
        dueDate: task.dueDate
      }))
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedTo, dueDate, status } = req.body;
    const { userId } = req.user;

    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ message: "task not found" })
    }

    if (task.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this task" })
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, assignedTo, dueDate, status },
      { new: true, runValidators: true }
    )

    res.status(200).json({
      message: "task updated successfully",
      task: {
        _id: updatedTask._id,
        title: updatedTask.title,
        description: updatedTask.description,
        assignedTo: updatedTask.assignedTo,
        createdBy: updatedTask.createdBy,
        status: updatedTask.status,
        dueDate: updatedTask.dueDate
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ message: "task not found" })
    }

    if (task.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this task" })
    }

    await Task.findByIdAndDelete(id)
    res.status(200).json({ message: "task deleted successfully" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
