"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = require("express");
const customer_controller_1 = require("./customer.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const customer_validation_1 = require("./customer.validation");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(customer_validation_1.CustomerValidation.createCustomerValidationSchema), customer_controller_1.CustomerController.createCustomer);
router.get('/', customer_controller_1.CustomerController.getAllCustomers);
router.get('/:customerId', customer_controller_1.CustomerController.getCustomerById);
router.put('/:customerId', (0, validateRequest_1.default)(customer_validation_1.CustomerValidation.updateCustomerValidationSchema), customer_controller_1.CustomerController.updateCustomer);
router.delete('/:customerId', customer_controller_1.CustomerController.deleteCustomer);
exports.CustomerRoutes = router;
