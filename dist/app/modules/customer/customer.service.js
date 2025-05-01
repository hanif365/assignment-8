"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma = new client_1.PrismaClient();
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if email already exists or not
    const existingCustomer = yield prisma.customer.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (existingCustomer) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Email already exists');
    }
    const result = yield prisma.customer.create({
        data: payload,
    });
    return result;
});
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.customer.findMany();
    return result;
});
const getCustomerById = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.customer.findUnique({
        where: {
            customerId,
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Customer not found');
    }
    return result;
});
const updateCustomer = (customerId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if customer exists or not
    const exists = yield prisma.customer.findUnique({
        where: {
            customerId,
        },
    });
    if (!exists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Customer not found');
    }
    // If we are updating the email, check if the new email already exists
    if (payload.email) {
        const emailExists = yield prisma.customer.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (emailExists && emailExists.customerId !== customerId) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Email already exists');
        }
    }
    const result = yield prisma.customer.update({
        where: {
            customerId,
        },
        data: payload,
    });
    return result;
});
const deleteCustomer = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma.customer.findUnique({
        where: {
            customerId,
        },
    });
    if (!exists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Customer not found');
    }
    const result = yield prisma.customer.delete({
        where: {
            customerId,
        },
    });
    return result;
});
exports.CustomerService = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
