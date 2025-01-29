import UnauthorizedError from './UnauthorizedError';
import UniqueError from './UniqueError';

export const errorHandling = <T>(error: T) => {
  if (error instanceof UnauthorizedError) {
    return {
      code: 401,
      message: error.message
    };
  }

  if (error instanceof UniqueError) {
    return {
      code: 409,
      message: error.message
    };
  }

  if (error instanceof Error) {
    return {
      code: 400,
      message: error.message
    };
  }

  return {
    code: 400,
    message: 'Server Error!'
  };
};
