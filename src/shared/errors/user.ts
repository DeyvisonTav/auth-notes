export class UserErrors {
  static userNotFound(message: string, statusCode: number): Error {
    return new Error(message, {
      cause: {
        statusCode,
        message,
      }
    });
  }

  static userAlreadyExists(message: string, statusCode: number): Error {
    return new Error(message, {
      cause: {
        statusCode,
        message,
      }
    });
  }

  static userInvalidPassword(message: string, statusCode: number): Error {
    return new Error(message, {
      cause: {
        statusCode,
        message,
      }
    });
  }

  static userInvalidEmail(message: string, statusCode: number): Error {
    return new Error(message, {
      cause: {
        statusCode,
        message,
      }
    });
  }

  static userInvalidName(message: string, statusCode: number): Error {
    return new Error(message, {
      cause: {
        statusCode,
        message,
      }
    });
  }

  static userInvalidPasswordConfirmation(message: string, statusCode: number): Error {
    return new Error(message, {
      cause: {
        statusCode,
        message,
      }
    });
  }
}