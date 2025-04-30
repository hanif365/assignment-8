import { Bike, PrismaClient } from "@prisma/client";
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';

const prisma = new PrismaClient();

const createBike = async (payload: Bike): Promise<Bike> => {
  // Check if customer exists or not
  const customerExists = await prisma.customer.findUnique({
    where: {
      customerId: payload.customerId,
    },
  });

  if (!customerExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Customer not found');
  }

  const result = await prisma.bike.create({
    data: payload,
  });
  return result;
};

const getAllBikes = async (): Promise<Bike[]> => {
  const result = await prisma.bike.findMany();
  return result;
};

const getBikeById = async (bikeId: string): Promise<Bike> => {
  const result = await prisma.bike.findUnique({
    where: {
      bikeId,
    },
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bike not found');
  }

  return result;
};

export const BikeService = {
  createBike,
  getAllBikes,
  getBikeById,
}; 