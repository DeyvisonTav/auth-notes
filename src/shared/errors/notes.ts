export class NotesErrors {
  static noteNotFound(message: string, statusCode: number): Error {
    return new Error(message, {
      cause: {
        statusCode,
        message,
      }
    });
  }

  static noteAlreadyExists(message: string, statusCode: number): Error {
    return new Error(message, {
      cause: {
        statusCode,
        message,
      }
    });
  }

  static noteInvalidUserId(message: string, statusCode: number): Error {
    return new Error(message, {
      cause: {
        statusCode,
        message,
      }
    });
  }
}