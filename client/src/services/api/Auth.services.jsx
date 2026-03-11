import axios from "axios";
import { ENV } from "../../Utils/env.js";

export const api = axios.create({
  baseURL: ENV.VITE_API_BASE_URL
})

export const register = async ({ userData }) => {
  try {
    const response = await api.post("/v1/auth/register", { userData })
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export const login = async ({ userData }) => {
  try {
    const response = await api.post("/v1/auth/login", { userData })
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export const logout = async ({ userData }) => {
  try {
    const response = await api.post("/v1/auth/logout", { userData })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getProfile = async () => {
  try {
    const response = await api.get("/v1/auth/profile")
    return response.data
  } catch (error) {
    console.log(error)
  }
}
