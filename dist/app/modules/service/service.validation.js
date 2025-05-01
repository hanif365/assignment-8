"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const service_constants_1 = require("./service.constants");
const createServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string({
            required_error: 'Bike ID is required',
        }),
        serviceDate: zod_1.z.string({
            required_error: 'Service date is required',
        }).transform(val => new Date(val)),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        status: zod_1.z.enum([service_constants_1.ServiceStatus.PENDING, service_constants_1.ServiceStatus.IN_PROGRESS, service_constants_1.ServiceStatus.DONE], {
            required_error: 'Status is required',
        }),
    }),
});
const completeServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        completionDate: zod_1.z.string()
            .optional()
            .transform(val => val ? new Date(val) : new Date()),
    }),
});
exports.ServiceValidation = {
    createServiceValidationSchema,
    completeServiceValidationSchema,
};
