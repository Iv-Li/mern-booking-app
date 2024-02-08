export default abstract class CustomError extends Error {
  statusCode: number
  status: 'failed' | 'error'
  isOperational: boolean
  protected constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode
    this.status = this.statusCode >= 400 && this.statusCode <500 ? 'failed' : 'error'

    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

