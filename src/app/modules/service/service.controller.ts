import { Request, Response } from "express";
import { ServiceService } from "./service.service";
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { ServiceRecord } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const createService = catchAsync(async (req: Request, res: Response) => {
  const service = req.body;
  const result = await ServiceService.createService(service);

  sendResponse<ServiceRecord>(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Service record created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.getAllServices();

  sendResponse<ServiceRecord>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Service records fetched successfully",
    data: result,
  });
});

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const result = await ServiceService.getServiceById(serviceId);

  sendResponse<ServiceRecord>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Service record fetched successfully",
    data: result,
  });
});

const completeService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const { completionDate } = req.body;
  const result = await ServiceService.completeService(serviceId, completionDate);

  sendResponse<ServiceRecord>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Service marked as completed",
    data: result,
  });
});

const getOverdueServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.getOverdueServices();

  sendResponse<ServiceRecord>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Overdue or pending services fetched successfully",
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  getServiceById,
  completeService,
  getOverdueServices,
}; 