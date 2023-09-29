import { DEV_MODE } from "../constants/variables";

export const log = (...args: any[]) => DEV_MODE && console.log(...args)
export const json = (obj: any) => JSON.stringify(obj, null, 4)
export const logJson = (obj: any) => log(json(obj))

export const avatarNameSub = (name: string) => {
  const names = name.split(" ")
  if(names.length < 2) return name.toUpperCase().slice(0, 2)
  return names.slice(0, 2).map(_name => _name.toUpperCase()[0]).join("")
}


export const addBase64Addons = (base64: string, type: string = "image/jpeg") => {
  return `data:${type};base64,${base64}`
}