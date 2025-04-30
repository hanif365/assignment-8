import { Request, Response } from "express";
import { BikeService } from "./bike.service";
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { Bike } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const createBike = catchAsync(async (req: Request, res: Response) => {
  const bike = req.body;
  const result = await BikeService.createBike(bike);

  sendResponse<Bike>(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Bike added successfully",
    data: result,
  });
});

const getAllBikes = catchAsync(async (req: Request, res: Response) => {
  const result = await BikeService.getAllBikes();

  sendResponse<Bike>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Bikes fetched successfully",
    data: result,
  });
});

const getBikeById = catchAsync(async (req: Request, res: Response) => {
  const { bikeId } = req.params;
  const result = await BikeService.getBikeById(bikeId);

  sendResponse<Bike>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Bike fetched successfully",
    data: result,
  });
});

export const BikeController = {
  createBike,
  getAllBikes,
  getBikeById,
}; 