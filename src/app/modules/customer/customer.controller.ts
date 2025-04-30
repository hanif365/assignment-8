import { Request, Response } from "express";
import { CustomerService } from "./customer.service";
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { Customer } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const customer = req.body;
  const result = await CustomerService.createCustomer(customer);

  sendResponse<Customer>(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Customer created successfully",
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerService.getAllCustomers();

  sendResponse<Customer>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Customers fetched successfully",
    data: result,
  });
});

const getCustomerById = catchAsync(async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const result = await CustomerService.getCustomerById(customerId);

  sendResponse<Customer>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Customer fetched successfully",
    data: result,
  });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const payload = req.body;
  const result = await CustomerService.updateCustomer(customerId, payload);

  sendResponse<Customer>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Customer updated successfully",
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customerId } = req.params;
  await CustomerService.deleteCustomer(customerId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Customer deleted successfully"
  });
});

export const CustomerController = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
