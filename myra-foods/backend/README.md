# Myra Foods Backend Documentation

## Overview
Myra Foods is a full-stack web application that allows users to browse products, manage their cart, and place orders. This document provides an overview of the backend setup, including routes, services, and how to run the application.

## Project Structure
The backend is organized as follows:

```
backend/
├── src/
│   ├── app.ts                # Main entry point for the backend application
│   ├── routes/
│   │   └── orderRoutes.ts    # Routes for order placement
│   ├── services/
│   │   ├── emailService.ts    # Service for sending emails using Nodemailer
│   │   └── orderService.ts     # Service for processing orders
│   └── types/
│       └── index.ts           # TypeScript interfaces for order data
├── package.json               # Dependencies and scripts for the backend
├── tsconfig.json              # TypeScript configuration for the backend
└── README.md                  # Documentation for the backend
```

## Installation
1. Navigate to the `backend` directory.
2. Install the dependencies:
   ```
   npm install
   ```

## Environment Variables
Create a `.env` file in the `backend` directory to store sensitive information such as SMTP credentials for Nodemailer. Example:
```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
```

## Running the Application
To start the backend server, run:
```
npm start
```

## API Endpoints
### Place Order
- **Endpoint:** `/api/place-order`
- **Method:** `POST`
- **Description:** Handles order submissions. It validates the order data and sends a confirmation email using the email service.

### Example Request
```json
{
  "name": "John Doe",
  "phone": "1234567890",
  "email": "john@example.com",
  "address": "123 Main St",
  "landmark": "Near Park",
  "review": "Great service!",
  "cartItems": [
    {
      "productId": "1",
      "quantity": 2
    }
  ]
}
```

## Testing
Ensure that the application is tested locally to verify that the order flow works as expected. Use tools like Postman to test the API endpoints.

## Deployment
For deployment, consider using a cloud service that supports Node.js applications. Ensure that the environment variables are set correctly in the production environment.

## Conclusion
This README provides a comprehensive overview of the backend setup for the Myra Foods application. Follow the instructions to install, run, and test the application effectively.