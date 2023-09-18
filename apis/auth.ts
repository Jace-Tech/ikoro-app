import { USER_LOGIN_ENDPOINT, USER_REGISTER_ENDPOINT } from "."
import { log } from "../utils/helpers"

export const registerUser = async (data: RegisterType): Promise<ResponseDataType> => {
  try {
    const option: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
    const request = await fetch(USER_REGISTER_ENDPOINT, option)
    const response = await request.json()
    log("REGISTER [RES]:", response)
    return response as any
  } catch (error: any) {
    log("REGISTER [ERROR]:", error.message)
    return { message: error.message, success: false, data: null } as ResponseDataType
  }
}

export const loginUser = async (data: LoginType): Promise<ResponseDataType> => {
  try {
    const option: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
    const request = await fetch(USER_LOGIN_ENDPOINT, option)
    const response = await request.json()
    log("LOGIN [RES]:", response)
    return response as any
  } catch (error: any) {
    log("LOGIN [ERROR]:", error.message)
    return { message: error.message, success: false, data: null } as ResponseDataType
  }
}