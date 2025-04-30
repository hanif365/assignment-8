import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

type TSendResponse<T> = {
  success: boolean;
  statusCode: StatusCodes;
  message: string;
  data: T | T[] | null;
};

const sendResponse = <T>(res: Response, data: TSendResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
