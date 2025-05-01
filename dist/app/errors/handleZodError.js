"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handleZodError = (error) => {
    const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    const message = 'Validation Error';
    const errorMessages = error.errors.map((err) => {
        return {
            path: err.path.join('.'),
            message: err.message,
        };
    });
    return {
        statusCode,
        message,
        errorMessages,
    };
};
exports.default = handleZodError;
