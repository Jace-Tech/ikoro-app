import { USER_REGISTER_ENDPOINT } from "."
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
    const response = await request.text()
    return response as any
  } catch (error: any) {
    log("REGISTER:", error.message)
    return { message: error.message, success: false, data: null } as ResponseDataType
  }
}