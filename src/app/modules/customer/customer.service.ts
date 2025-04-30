import { Customer, PrismaClient } from "@prisma/client";
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';

const prisma = new PrismaClient();

const createCustomer = async (payload: Customer): Promise<Customer> => {
  // Check if email already exists or not
  const existingCustomer = await prisma.customer.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingCustomer) {
    throw new AppError(StatusCodes.CONFLICT, 'Email already exists');
  }

  const result = await prisma.customer.create({
    data: payload,
  });
  return result;
};

const getAllCustomers = async (): Promise<Customer[]> => {
  const result = await prisma.customer.findMany();
  return result;
};

const getCustomerById = async (customerId: string): Promise<Customer> => {
  const result = await prisma.customer.findUnique({
    where: {
      customerId,
    },
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Customer not found');
  }

  return result;
};

const updateCustomer = async (
  customerId: string,
  payload: Partial<Customer>
): Promise<Customer> => {
  // Check if customer exists or not
  const exists = await prisma.customer.findUnique({
    where: {
      customerId,
    },
  });

  if (!exists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Customer not found');
  }

  // If we are updating the email, check if the new email already exists
  if (payload.email) {
    const emailExists = await prisma.customer.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (emailExists && emailExists.customerId !== customerId) {
      throw new AppError(StatusCodes.CONFLICT, 'Email already exists');
    }
  }

  const result = await prisma.customer.update({
    where: {
      customerId,
    },
    data: payload,
  });
  return result;
};

const deleteCustomer = async (customerId: string): Promise<Customer> => {
  const exists = await prisma.customer.findUnique({
    where: {
      customerId,
    },
  });

  if (!exists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Customer not found');
  }

  const result = await prisma.customer.delete({
    where: {
      customerId,
    },
  });
  return result;
};

export const CustomerService = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
