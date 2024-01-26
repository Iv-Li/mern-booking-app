export default abstract class CustomError extends Error {
  abstract statusCode: number
  protected constructor(message: string) {
    super(message);
  }
}

