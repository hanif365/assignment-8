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
exports.ServiceService = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_constants_1 = require("./service.constants");
const prisma = new client_1.PrismaClient();
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if bike exists or not
    const bikeExists = yield prisma.bike.findUnique({
        where: {
            bikeId: payload.bikeId,
        },
    });
    if (!bikeExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Bike not found');
    }
    const result = yield prisma.serviceRecord.create({
        data: payload,
    });
    return result;
});
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.serviceRecord.findMany();
    return result;
});
const getServiceById = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.serviceRecord.findUnique({
        where: {
            serviceId,
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Service record not found');
    }
    return result;
});
const completeService = (serviceId, completionDate) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if service exists or not
    const exists = yield prisma.serviceRecord.findUnique({
        where: {
            serviceId,
        },
    });
    if (!exists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Service record not found');
    }
    const result = yield prisma.serviceRecord.update({
        where: {
            serviceId,
        },
        data: {
            completionDate,
            status: service_constants_1.ServiceStatus.DONE,
        },
    });
    return result;
});
const getOverdueServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const olderThanSevenDays = new Date();
    olderThanSevenDays.setDate(olderThanSevenDays.getDate() - 7);
    const result = yield prisma.serviceRecord.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { status: service_constants_1.ServiceStatus.PENDING },
                        { status: service_constants_1.ServiceStatus.IN_PROGRESS }
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
});
exports.ServiceService = {
    createService,
    getAllServices,
    getServiceById,
    completeService,
    getOverdueServices,
};
