type StatusType = "error" | "success" | "warning" | "info"

export class CustomError extends Error {
  status: string;

  constructor(message: string, status: StatusType = "error") {
    super(message)
    this.status = status
  }
}