"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeRoutes = void 0;
const express_1 = require("express");
const bike_controller_1 = require("./bike.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bike_validation_1 = require("./bike.validation");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(bike_validation_1.BikeValidation.createBikeValidationSchema), bike_controller_1.BikeController.createBike);
router.get('/', bike_controller_1.BikeController.getAllBikes);
router.get('/:bikeId', bike_controller_1.BikeController.getBikeById);
exports.BikeRoutes = router;
