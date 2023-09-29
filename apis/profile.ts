import { PROFILE_UPLOAD_ENDPOINT } from "."
import { json, log } from "../utils/helpers"

// HANDLE USER LOGIN
export const uploadProfilePicture = async (profile: string, token: string): Promise<ResponseDataType> => {
  try {
    const option: RequestInit = {
      method: "PATCH",
      body: JSON.stringify({ profile }),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
    const request = await fetch(PROFILE_UPLOAD_ENDPOINT, option)
    const response = await request.json()
    log("PROFILE UPLOAD [RES]:", json(response))
    return response as any
  } catch (error: any) {
    log("PROFILE UPLOAD [ERROR]:", error.message)
    return { message: error.message, success: false, data: null } as ResponseDataType
  }
}
