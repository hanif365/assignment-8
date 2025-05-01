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
exports.BikeService = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma = new client_1.PrismaClient();
const createBike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if customer exists or not
    const customerExists = yield prisma.customer.findUnique({
        where: {
            customerId: payload.customerId,
        },
    });
    if (!customerExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Customer not found');
    }
    const result = yield prisma.bike.create({
        data: payload,
    });
    return result;
});
const getAllBikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.bike.findMany();
    return result;
});
const getBikeById = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.bike.findUnique({
        where: {
            bikeId,
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Bike not found');
    }
    return result;
});
exports.BikeService = {
    createBike,
    getAllBikes,
    getBikeById,
};
