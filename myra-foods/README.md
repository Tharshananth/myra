# myra-foods/README.md

# Myra Foods

Myra Foods is a full-stack web application that allows users to browse products, manage their cart, and place orders. This project is structured into a frontend built with React and a backend powered by Express.

## Project Structure

```
myra-foods
├── backend
│   ├── src
│   │   ├── app.ts          # Main entry point for the backend
│   │   ├── routes
│   │   │   └── orderRoutes.ts # Handles order-related routes
│   │   ├── services
│   │   │   ├── emailService.ts # Sends emails using Nodemailer
│   │   │   └── orderService.ts  # Processes orders
│   │   └── types
│   │       └── index.ts       # TypeScript interfaces
│   ├── package.json          # Backend dependencies and scripts
│   ├── tsconfig.json         # TypeScript configuration for the backend
│   └── README.md             # Backend documentation
├── frontend
│   ├── src
│   │   ├── App.tsx           # Main component of the React application
│   │   ├── index.css         # Global styles
│   │   ├── main.tsx          # Entry point for the React application
│   │   ├── components        # Contains all React components
│   │   ├── contexts          # Contexts for state management
│   │   ├── services          # Services for API calls
│   │   └── types             # TypeScript interfaces for products
│   ├── public
│   │   └── cart.html         # HTML structure for the cart page
│   ├── package.json          # Frontend dependencies and scripts
│   ├── tsconfig.json         # TypeScript configuration for the frontend
│   └── README.md             # Frontend documentation
├── package.json               # Root configuration for the entire project
├── tsconfig.json              # Root TypeScript configuration
└── README.md                  # Project documentation
```

## Features

- **Product Browsing**: Users can view a list of products and their details.
- **Cart Management**: Users can add products to their cart, view the cart, and manage items.
- **Order Placement**: Users can place orders by filling out a form with their details.
- **Email Notifications**: Users receive email confirmations upon successful order placement.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd myra-foods
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

### Running the Application

To run both the frontend and backend servers simultaneously, use the following command from the root directory:
```
npm run dev
```

### Environment Variables

Create a `.env` file in the `backend` directory to store sensitive information such as SMTP settings for Nodemailer.

### Testing

Ensure to test the application locally to verify that the order flow works as expected.

### Deployment

Deploy the application on a cloud server and test the full order flow to ensure everything functions correctly.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.