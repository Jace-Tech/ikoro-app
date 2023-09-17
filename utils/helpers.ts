import { DEV_MODE } from "../constants/variables";

export const log = (...args: any[]) => DEV_MODE && console.log(...args)
