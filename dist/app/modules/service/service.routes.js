"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = require("express");
const service_controller_1 = require("./service.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validation_1 = require("./service.validation");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(service_validation_1.ServiceValidation.createServiceValidationSchema), service_controller_1.ServiceController.createService);
router.get('/', service_controller_1.ServiceController.getAllServices);
router.get('/status', service_controller_1.ServiceController.getOverdueServices);
router.get('/:serviceId', service_controller_1.ServiceController.getServiceById);
router.put('/:serviceId/complete', (0, validateRequest_1.default)(service_validation_1.ServiceValidation.completeServiceValidationSchema), service_controller_1.ServiceController.completeService);
exports.ServiceRoutes = router;
