// server.js - Unified Express + Vite Server
import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// HTML Email Template
const generateOrderEmailHTML = (orderData) => {
  const { orderId, customer, items, pricing, timestamp } = orderData;
  
  const itemsHTML = items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px;">${item.name}</td>
      <td style="padding: 12px; text-align: center;">×${item.quantity}</td>
      <td style="padding: 12px; text-align: right; color: #16a34a; font-weight: 600;">₹${item.total}</td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px; }
    .order-id { background: #fef3c7; border: 2px solid #eab308; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
    .order-id-value { font-size: 24px; font-weight: 700; color: #16a34a; font-family: monospace; }
    .section { margin: 25px 0; }
    .section-title { font-size: 18px; font-weight: 700; color: #1f2937; margin-bottom: 15px; }
    .info-box { background: #f9fafb; border-left: 4px solid #16a34a; padding: 12px; margin: 8px 0; border-radius: 4px; }
    .info-label { font-size: 12px; color: #6b7280; text-transform: uppercase; }
    .info-value { font-size: 16px; color: #1f2937; font-weight: 600; margin-top: 3px; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th { background: #f3f4f6; padding: 12px; text-align: left; font-weight: 600; color: #4b5563; }
    .summary { background: #f9fafb; border-radius: 8px; padding: 15px; margin: 15px 0; }
    .summary-row { display: flex; justify-content: space-between; margin: 8px 0; }
    .summary-row.total { border-top: 2px solid #e5e7eb; padding-top: 10px; margin-top: 10px; font-size: 18px; font-weight: 700; color: #16a34a; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 New Order Received!</h1>
      <p>Myra Foods Order Notification</p>
    </div>
    
    <div class="content">
      <div class="order-id">
        <div class="info-label">Order ID</div>
        <div class="order-id-value">${orderId}</div>
      </div>

      <div class="section">
        <div class="section-title">📋 Customer Details</div>
        <div class="info-box">
          <div class="info-label">👤 Name</div>
          <div class="info-value">${customer.name}</div>
        </div>
        <div class="info-box">
          <div class="info-label">📧 Email</div>
          <div class="info-value">${customer.email}</div>
        </div>
        <div class="info-box">
          <div class="info-label">📱 Phone</div>
          <div class="info-value">${customer.phone}</div>
        </div>
        <div class="info-box">
          <div class="info-label">📍 Delivery Address</div>
          <div class="info-value">${customer.address}</div>
        </div>
        ${customer.landmark ? `
        <div class="info-box">
          <div class="info-label">🗺️ Landmark</div>
          <div class="info-value">${customer.landmark}</div>
        </div>` : ''}
      </div>

      <div class="section">
        <div class="section-title">🛒 Order Items</div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th style="text-align: center;">Quantity</th>
              <th style="text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>₹${pricing.subtotal}</span>
          </div>
          <div class="summary-row">
            <span>Delivery Fee:</span>
            <span>${pricing.deliveryFee === 0 ? '🎉 FREE' : '₹' + pricing.deliveryFee}</span>
          </div>
          <div class="summary-row">
            <span>Taxes & Fees:</span>
            <span>₹${pricing.tax}</span>
          </div>
          <div class="summary-row total">
            <span>TOTAL (COD):</span>
            <span>₹${pricing.total}</span>
          </div>
        </div>
      </div>

      <div style="background: #dbeafe; border-left: 4px solid #0284c7; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <p style="margin: 0; color: #0c4a6e; font-size: 14px;">
          <strong>💰 Payment Method:</strong> Cash on Delivery (COD)<br>
          <strong>⏰ Order Time:</strong> ${timestamp}<br>
          <strong>🚚 Estimated Delivery:</strong> 30-45 minutes
        </p>
      </div>
    </div>

    <div class="footer">
      <p>This is an automated order notification from Myra Foods</p>
      <p>© 2025 Myra Foods. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Customer Confirmation Email
const generateCustomerEmailHTML = (orderData) => {
  const { orderId, customer, items, pricing, timestamp } = orderData;
  
  const itemsHTML = items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px;">${item.name}</td>
      <td style="padding: 12px; text-align: center;">×${item.quantity}</td>
      <td style="padding: 12px; text-align: right; color: #16a34a; font-weight: 600;">₹${item.total}</td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px; }
    .success-icon { font-size: 48px; text-align: center; margin: 20px 0; }
    .order-id { background: #fef3c7; border: 2px solid #eab308; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
    .order-id-value { font-size: 24px; font-weight: 700; color: #16a34a; font-family: monospace; }
    .section { margin: 25px 0; }
    .section-title { font-size: 18px; font-weight: 700; color: #1f2937; margin-bottom: 15px; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th { background: #f3f4f6; padding: 12px; text-align: left; font-weight: 600; color: #4b5563; }
    .summary { background: #f9fafb; border-radius: 8px; padding: 15px; margin: 15px 0; }
    .summary-row { display: flex; justify-content: space-between; margin: 8px 0; }
    .summary-row.total { border-top: 2px solid #e5e7eb; padding-top: 10px; margin-top: 10px; font-size: 18px; font-weight: 700; color: #16a34a; }
    .highlight-box { background: #dbeafe; border-left: 4px solid #0284c7; padding: 15px; border-radius: 4px; margin: 20px 0; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Order Confirmed!</h1>
      <p>Thank you for your order, ${customer.name}!</p>
    </div>
    
    <div class="content">
      <div class="success-icon">🎉</div>

      <div class="order-id">
        <div style="font-size: 12px; color: #92400e; text-transform: uppercase;">Order ID</div>
        <div class="order-id-value">${orderId}</div>
      </div>

      <div class="section">
        <div class="section-title">🛒 Your Order</div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>₹${pricing.subtotal}</span>
          </div>
          <div class="summary-row">
            <span>Delivery Fee:</span>
            <span>${pricing.deliveryFee === 0 ? '🎉 FREE' : '₹' + pricing.deliveryFee}</span>
          </div>
          <div class="summary-row">
            <span>Taxes & Fees:</span>
            <span>₹${pricing.tax}</span>
          </div>
          <div class="summary-row total">
            <span>Total Amount:</span>
            <span>₹${pricing.total}</span>
          </div>
        </div>
      </div>

      <div class="highlight-box">
        <p style="margin: 0; color: #0c4a6e; font-size: 14px;">
          <strong>💰 Payment Method:</strong> Cash on Delivery (COD)<br>
          <strong>📍 Delivery Address:</strong> ${customer.address}<br>
          <strong>🚚 Estimated Delivery:</strong> 30-45 minutes<br>
          <strong>📞 Contact:</strong> For payment, please contact Pingus
        </p>
      </div>

      <div class="section">
        <div class="section-title">📞 Need Help?</div>
        <p style="color: #666; line-height: 1.6;">
          If you have any questions about your order, please contact us:<br>
          <strong>Email:</strong> ${process.env.OFFICIAL_MAIL || 'support@myrafoods.com'}<br>
          <strong>Phone:</strong> Contact via WhatsApp
        </p>
      </div>
    </div>

    <div class="footer">
      <p>Thank you for choosing Myra Foods!</p>
      <p>© 2025 Myra Foods. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// API Routes
app.post('/api/place-order', async (req, res) => {
  try {
    const { customer, items, pricing } = req.body;

    // Validate required fields
    if (!customer?.name || !customer?.email || !customer?.phone || !customer?.address) {
      return res.status(400).json({
        success: false,
        message: 'Missing required customer information'
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in the order'
      });
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Get current timestamp
    const timestamp = new Date().toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const orderData = {
      orderId,
      customer,
      items,
      pricing,
      timestamp
    };

    // Send email to admin
    const adminEmail = process.env.OFFICIAL_MAIL;
    if (!adminEmail) {
      throw new Error('OFFICIAL_MAIL not configured in environment variables');
    }

    await transporter.sendMail({
      from: `"Myra Foods Orders" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `🎉 New Order #${orderId} - ₹${pricing.total}`,
      html: generateOrderEmailHTML(orderData)
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"Myra Foods" <${process.env.SMTP_USER}>`,
      to: customer.email,
      subject: `✅ Order Confirmed - ${orderId}`,
      html: generateCustomerEmailHTML(orderData)
    });

    console.log(`✅ Order ${orderId} placed successfully`);

    res.json({
      success: true,
      message: 'Order placed successfully!',
      orderId,
      timestamp
    });

  } catch (error) {
    console.error('❌ Order placement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize server
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Production: Serve built files
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Development: Use Vite dev server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   🚀 Myra Foods Server Running         ║
║   📍 http://localhost:${PORT}           ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}          ║
║   📧 Email: ${process.env.SMTP_USER ? '✅ Configured' : '❌ Not configured'}    ║
╚════════════════════════════════════════╝
    `);
  });
}

startServer().catch(console.error);