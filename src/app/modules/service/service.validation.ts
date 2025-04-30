import { z } from 'zod';
import { ServiceStatus, TServiceStatus } from './service.constants';

const createServiceValidationSchema = z.object({
  body: z.object({
    bikeId: z.string({
      required_error: 'Bike ID is required',
    }),
    serviceDate: z.string({
      required_error: 'Service date is required',
    }).transform(val => new Date(val)),
    description: z.string({
      required_error: 'Description is required',
    }),
    status: z.enum([ServiceStatus.PENDING, ServiceStatus.IN_PROGRESS, ServiceStatus.DONE], {
      required_error: 'Status is required',
    }) as z.ZodEnum<[TServiceStatus, TServiceStatus, TServiceStatus]>,
  }),
});

const completeServiceValidationSchema = z.object({
  body: z.object({
    completionDate: z.string()
      .optional()
      .transform(val => val ? new Date(val) : new Date()),
  }),
});

export const ServiceValidation = {
  createServiceValidationSchema,
  completeServiceValidationSchema,
}; 