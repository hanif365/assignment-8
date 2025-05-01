![bike](https://github.com/user-attachments/assets/10bfe515-5037-4854-9453-942aa35a810d)


# Bike Servicing Management API

This is a backend API system where we can managing a bike servicing center's operations, including customer records, bike inventory, and service management.

[🚀 API Documentation](https://documenter.getpostman.com/view/31322920/2sB2j4eAim)

## 🛠️ Technologies

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

## 📋 Key Features

- Customer Management CRUD operations
- Bike inventory tracking
- Service records and status management
- Overdue service identification
- Input validation with Zod
- Standardized error handling

## 🚀 Setup Guide

### Prerequisites

- Node.js (v16+)
- PostgreSQL

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/hanif365/assignment-8.git
   cd assignment-8
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/bike_service_db"
   PORT=5000
   NODE_ENV=development
   ```

4. Set up the database
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

## 🔄 API Endpoints

### Customer Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/customers` | Create a new customer |
| GET | `/api/customers` | Get all customers |
| GET | `/api/customers/:customerId` | Get a specific customer by ID |
| PUT | `/api/customers/:customerId` | Update customer details |
| DELETE | `/api/customers/:customerId` | Delete a customer |

### Bike Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bikes` | Add a new bike |
| GET | `/api/bikes` | Get all bikes |
| GET | `/api/bikes/:bikeId` | Get a specific bike by ID |

### Service Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/services` | Create a service record |
| GET | `/api/services` | Get all service records |
| GET | `/api/services/:serviceId` | Get a specific service record |
| PUT | `/api/services/:serviceId/complete` | Mark a service as completed |
| GET | `/api/services/status` | Get overdue services (older than 7 days) |

