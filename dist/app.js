"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const http_status_codes_1 = require("http-status-codes");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Welcome route
app.get("/", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "Welcome to our Bike Servicing Management API",
        version: "1.0.0",
        API_documentation: "https://documenter.getpostman.com/view/31322920/2sB2j4eAim",
        success: true,
    });
});
// application routes
app.use("/api", routes_1.default);
// global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
