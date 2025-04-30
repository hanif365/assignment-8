import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

const handleZodError = (error: ZodError) => {
  const statusCode = StatusCodes.BAD_REQUEST;
  const message = 'Validation Error';
  
  const errorMessages = error.errors.map((err) => {
    return {
      path: err.path.join('.'),
      message: err.message,
    };
  });

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleZodError; 