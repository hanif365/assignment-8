import { z } from 'zod';

const createBikeValidationSchema = z.object({
  body: z.object({
    brand: z.string({
      required_error: 'Brand is required',
    }),
    model: z.string({
      required_error: 'Model is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    customerId: z.string({
      required_error: 'Customer ID is required',
    }),
  }),
});

export const BikeValidation = {
  createBikeValidationSchema,
}; 