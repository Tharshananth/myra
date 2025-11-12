# Myra Foods Project

## Overview
Myra Foods is a full-stack web application that allows users to browse products, manage their cart, and place orders. This project is built using React for the frontend and Express for the backend, with TypeScript for type safety.

## Project Structure
The project is organized into two main directories: `frontend` and `backend`. Each directory contains its own source files, configuration files, and dependencies.

### Frontend
- **Framework**: React
- **Entry Point**: `src/main.tsx`
- **Components**: Includes various components such as `Cart`, `Header`, `Footer`, and product-related components.
- **Styling**: Global styles are defined in `src/index.css`.

### Backend
- **Framework**: Express
- **Entry Point**: `src/app.ts`
- **Routes**: Includes routes for handling orders, specifically the `/api/place-order` route.
- **Services**: Utilizes Nodemailer for sending order confirmation emails.

## Features
- **Cart Functionality**: Users can add products to their cart, view the cart, and proceed to checkout.
- **Order Placement**: Users can submit their orders, which are processed and sent via email.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Setup Instructions
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd myra-foods
   ```

2. **Install Dependencies**:
   - For the frontend:
     ```
     cd frontend
     npm install
     ```
   - For the backend:
     ```
     cd backend
     npm install
     ```

3. **Environment Variables**: Create a `.env` file in the `backend` directory and add your SMTP configuration for Nodemailer.

4. **Run the Application**:
   - To start both the frontend and backend servers, run:
     ```
     npm run dev
     ```
   This command should be set up in the root `package.json` to concurrently start both servers.

## Usage
- Navigate to the homepage to browse products.
- Add items to your cart and proceed to checkout.
- Fill in your details and submit your order.

## Testing
- Ensure that the order flow works as expected by testing locally.
- Check that emails are sent upon order placement.

## Deployment
- The application can be deployed on a cloud server. Ensure that all environment variables are set correctly in the production environment.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.