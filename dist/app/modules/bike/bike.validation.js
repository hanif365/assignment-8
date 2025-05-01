"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeValidation = void 0;
const zod_1 = require("zod");
const createBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        brand: zod_1.z.string({
            required_error: 'Brand is required',
        }),
        model: zod_1.z.string({
            required_error: 'Model is required',
        }),
        year: zod_1.z.number({
            required_error: 'Year is required',
        }),
        customerId: zod_1.z.string({
            required_error: 'Customer ID is required',
        }),
    }),
});
exports.BikeValidation = {
    createBikeValidationSchema,
};
