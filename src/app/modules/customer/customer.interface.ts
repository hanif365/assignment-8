import { Customer } from "@prisma/client";

export type TCustomer = {
  customerId?: string;
  name: string;
  email: string;
  phone: string;
  createdAt?: Date;
};

export type TCustomerResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Customer | Customer[] | null;
}; 