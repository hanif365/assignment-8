import express, { Application } from "express";
import cors from "cors";
import routes from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { StatusCodes } from 'http-status-codes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Welcome route
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Welcome to our Bike Servicing Management API",
    version: "1.0.0",
    API_documentation: "https://documenter.getpostman.com/view/31322920/2sB2j4eAim",
    success: true,
  });
});

// application routes
app.use("/api", routes);

// global error handler
app.use(globalErrorHandler);

export default app;
