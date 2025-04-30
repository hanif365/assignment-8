import { PrismaClient, ServiceRecord } from "@prisma/client";
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { ServiceStatus } from './service.constants';

const prisma = new PrismaClient();

const createService = async (payload: ServiceRecord): Promise<ServiceRecord> => {
  // Check if bike exists or not
  const bikeExists = await prisma.bike.findUnique({
    where: {
      bikeId: payload.bikeId,
    },
  });

  if (!bikeExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bike not found');
  }

  const result = await prisma.serviceRecord.create({
    data: payload,
  });
  return result;
};

const getAllServices = async (): Promise<ServiceRecord[]> => {
  const result = await prisma.serviceRecord.findMany();
  return result;
};

const getServiceById = async (serviceId: string): Promise<ServiceRecord> => {
  const result = await prisma.serviceRecord.findUnique({
    where: {
      serviceId,
    },
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service record not found');
  }

  return result;
};

const completeService = async (
  serviceId: string,
  completionDate: Date
): Promise<ServiceRecord> => {
  // Check if service exists or not
  const exists = await prisma.serviceRecord.findUnique({
    where: {
      serviceId,
    },
  });

  if (!exists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service record not found');
  }

  const result = await prisma.serviceRecord.update({
    where: {
      serviceId,
    },
    data: {
      completionDate,
      status: ServiceStatus.DONE,
    },
  });
  return result;
};

const getOverdueServices = async (): Promise<ServiceRecord[]> => {
  const olderThanSevenDays = new Date();
  olderThanSevenDays.setDate(olderThanSevenDays.getDate() - 7);

  const result = await prisma.serviceRecord.findMany({
    where: {
      AND: [
        {
          OR: [
            { status: ServiceStatus.PENDING },
            { status: ServiceStatus.IN_PROGRESS }
          ]
        },
        {
          serviceDate: {
            lt: olderThanSevenDays
          }
        }
      ]
    },
  });
  return result;
};

export const ServiceService = {
  createService,
  getAllServices,
  getServiceById,
  completeService,
  getOverdueServices,
}; 