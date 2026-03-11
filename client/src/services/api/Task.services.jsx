import { api } from "./Auth.services";

export const createTask = async ({ userData }) => {
  try {
    const response = await api.post("/v1/task", { userData })
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export const getAllTasks = async () => {
  try {
    const response = await api.get("/v1/tasks")
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export const getTaskById = async ({ id }) => {
  try {
    const response = await api.get(`/v1/task/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const updateTask = async ({ id, taskData }) => {
  try {
    const response = await api.put(`/v1/task/${id}`, { taskData })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const deleteTask = async ({ id }) => {
  try {
    const response = await api.delete(`/v1/task/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
