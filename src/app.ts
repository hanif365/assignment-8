import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to our Bike Servicing Management API",
    version: "1.0.0",
    API_documentation: "",
    success: true,
  });
});

export default app;
