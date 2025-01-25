export class ResponseHelper {
  static success<T>(
    statusCode: number,
    message: string,
    data?: T
  ): { statusCode: number; success: true; message: string; data?: T } {
    return {
      statusCode,
      success: true,
      message,
      data,
    };
  }

  static error(
    statusCode: number,
    message: string
  ): { statusCode: number; success: false; message: string } {
    return {
      statusCode,
      success: false,
      message,
    };
  }
}
