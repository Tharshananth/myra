// src/services/emailService.ts
import nodemailer from 'nodemailer';

interface OrderItem {
  id: number | string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface OrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  orderTime: string;
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'sanjaibalasubramaniam26@gmail.com',
    pass: process.env.GMAIL_PASSWORD || 'your-app-password-here', // Use App Password
  },
});

// HTML Email Template
const generateEmailHTML = (order: OrderData): string => {
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 16px; font-weight: 500; color: #333;">${item.name}</td>
      <td style="padding: 16px; text-align: center; color: #666;">×${item.quantity}</td>
      <td style="padding: 16px; text-align: right; color: #16a34a; font-weight: 600;">₹${
        (parseInt(item.price.replace('₹', '')) * item.quantity).toFixed(0)
      }</td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Myra Foods</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f0fdf4 0%, #fffbeb 100%);
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          font-size: 28px;
          margin-bottom: 5px;
        }
        .header p {
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 30px;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
        }
        .section-title::before {
          content: '✓';
          display: inline-block;
          background: #16a34a;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          text-align: center;
          line-height: 24px;
          margin-right: 10px;
          font-size: 14px;
        }
        .info-box {
          background: #f9fafb;
          border-left: 4px solid #16a34a;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .info-label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .info-value {
          font-size: 16px;
          color: #1f2937;
          font-weight: 600;
          margin-top: 5px;
        }
        .order-id {
          background: linear-gradient(135deg, #fef3c7 0%, #fef08a 100%);
          border: 2px solid #eab308;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 20px;
        }
        .order-id-label {
          font-size: 12px;
          color: #92400e;
          text-transform: uppercase;
        }
        .order-id-value {
          font-size: 24px;
          font-weight: 700;
          color: #16a34a;
          margin-top: 5px;
          font-family: 'Courier New', monospace;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .items-table th {
          background: #f3f4f6;
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #4b5563;
          font-size: 13px;
          border-bottom: 2px solid #e5e7eb;
        }
        .summary-box {
          background: #f9fafb;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }
        .summary-row.total {
          border-top: 2px solid #e5e7eb;
          padding-top: 12px;
          margin-top: 12px;
          font-size: 18px;
          font-weight: 700;
          color: #16a34a;
        }
        .delivery-estimate {
          background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
          border-left: 4px solid #0284c7;
          padding: 15px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .delivery-estimate p {
          color: #0c4a6e;
          font-size: 14px;
          line-height: 1.6;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          color: white;
          padding: 14px 30px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          margin: 20px 0;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
        }
        .cta-button:hover {
          background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
        }
        .footer {
          background: #f9fafb;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        .footer p {
          font-size: 12px;
          color: #6b7280;
          margin: 5px 0;
        }
        .footer-links {
          margin-top: 15px;
        }
        .footer-links a {
          color: #16a34a;
          text-decoration: none;
          margin: 0 10px;
          font-size: 12px;
        }
        .badge {
          display: inline-block;
          background: #dbeafe;
          color: #0c4a6e;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-right: 10px;
        }
        .success-icon {
          font-size: 48px;
          text-align: center;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>🎉 Order Confirmed!</h1>
          <p>Thank you for your order with Myra Foods</p>
        </div>

        <!-- Content -->
        <div class="content">
          <div class="success-icon">✅</div>

          <!-- Order ID -->
          <div class="order-id">
            <div class="order-id-label">Order ID</div>
            <div class="order-id-value">${order.id}</div>
          </div>

          <!-- Customer Details -->
          <div class="section">
            <h2 class="section-title">Delivery Details</h2>
            <div class="info-box">
              <div class="info-label">👤 Name</div>
              <div class="info-value">${order.customerName}</div>
            </div>
            <div class="info-box">
              <div class="info-label">📱 Phone</div>
              <div class="info-value">${order.customerPhone}</div>
            </div>
            <div class="info-box">
              <div class="info-label">📍 Delivery Address</div>
              <div class="info-value">${order.deliveryAddress}</div>
            </div>
            <div class="info-box">
              <div class="info-label">⏰ Order Time</div>
              <div class="info-value">${order.orderTime}</div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="section">
            <h2 class="section-title">Order Summary</h2>
            <table class="items-table">
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

            <!-- Price Breakdown -->
            <div class="summary-box">
              <div class="summary-row">
                <span>Subtotal (${order.items.length} items)</span>
                <span>₹${order.subtotal}</span>
              </div>
              <div class="summary-row">
                <span>Delivery Fee ${order.deliveryFee === 0 ? '(FREE)' : ''}</span>
                <span>${order.deliveryFee === 0 ? '🎉 FREE' : '₹' + order.deliveryFee}</span>
              </div>
              <div class="summary-row">
                <span>Taxes & Charges</span>
                <span>₹${order.tax}</span>
              </div>
              <div class="summary-row total">
                <span>Total Amount</span>
                <span>₹${order.total}</span>
              </div>
            </div>
          </div>

          <!-- Delivery Information -->
          <div class="delivery-estimate">
            <p><strong>🚚 Estimated Delivery:</strong> 30-45 minutes</p>
            <p>Your order has been confirmed and is being prepared. You'll receive a notification when it's on its way!</p>
          </div>

          <!-- Features -->
          <div class="section">
            <h2 class="section-title">Why Choose Myra Foods?</h2>
            <div style="display: flex; gap: 15px; margin-top: 15px;">
              <div style="flex: 1;">
                <span class="badge">✓ Fresh Quality</span>
                <p style="font-size: 13px; color: #666; margin-top: 5px;">Sourced fresh daily</p>
              </div>
              <div style="flex: 1;">
                <span class="badge">✓ Fast Delivery</span>
                <p style="font-size: 13px; color: #666; margin-top: 5px;">30-45 minutes</p>
              </div>
              <div style="flex: 1;">
                <span class="badge">✓ Secure Payment</span>
                <p style="font-size: 13px; color: #666; margin-top: 5px;">100% Safe</p>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <a href="https://myrafoods.com" class="cta-button">Track Your Order</a>

          <!-- Support -->
          <div class="section">
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
              <strong>Need Help?</strong><br>
              Contact us at: <a href="mailto:sanjaibalasubramaniam26@gmail.com" style="color: #16a34a; text-decoration: none;">sanjaibalasubramaniam26@gmail.com</a><br>
              WhatsApp: Available 8 AM - 10 PM
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>© 2025 Myra Foods. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">About Us</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send Order Confirmation Email
export const sendOrderConfirmationEmail = async (
  order: OrderData,
  adminEmail: string = 'sanjaibalasubramaniam26@gmail.com'
): Promise<boolean> => {
  try {
    // Send to customer
    await transporter.sendMail({
      from: process.env.GMAIL_USER || 'sanjaibalasubramaniam26@gmail.com',
      to: order.customerEmail,
      subject: `✅ Order Confirmed - Myra Foods (Order ID: ${order.id})`,
      html: generateEmailHTML(order),
    });

    // Send to admin
    await transporter.sendMail({
      from: process.env.GMAIL_USER || 'sanjaibalasubramaniam26@gmail.com',
      to: adminEmail,
      subject: `📦 New Order Received - ${order.customerName} (${order.id})`,
      html: generateAdminEmailHTML(order),
    });

    console.log(`✅ Order confirmation emails sent successfully for order ${order.id}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};

// Admin Email Template
const generateAdminEmailHTML = (order: OrderData): string => {
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px; border-right: 1px solid #e5e5e5;">${item.name}</td>
      <td style="padding: 12px; text-align: center; border-right: 1px solid #e5e5e5;">×${item.quantity}</td>
      <td style="padding: 12px; text-align: right;">₹${
        (parseInt(item.price.replace('₹', '')) * item.quantity).toFixed(0)
      }</td>
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
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        .container { max-width: 700px; margin: 20px auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #f3f4f6; padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
        .info-section { background: #f9fafb; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .info-row { display: flex; justify-content: space-between; margin: 8px 0; }
        .label { font-weight: 600; color: #333; }
        .value { color: #666; }
        .total-section { background: #fff3cd; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #ffc107; }
        .total-row { display: flex; justify-content: space-between; font-size: 16px; font-weight: 700; color: #16a34a; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🎉 New Order Received!</h2>
          <p>Order ID: <strong>${order.id}</strong></p>
        </div>
        <div class="content">
          <div class="info-section">
            <h3 style="margin: 0 0 10px 0; color: #333;">Customer Details</h3>
            <div class="info-row">
              <span class="label">Name:</span>
              <span class="value">${order.customerName}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">${order.customerEmail}</span>
            </div>
            <div class="info-row">
              <span class="label">Phone:</span>
              <span class="value">${order.customerPhone}</span>
            </div>
            <div class="info-row">
              <span class="label">Address:</span>
              <span class="value">${order.deliveryAddress}</span>
            </div>
          </div>

          <h3 style="color: #333;">Order Items</h3>
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

          <div class="total-section">
            <div class="info-row" style="margin-bottom: 10px;">
              <span>Subtotal:</span>
              <span>₹${order.subtotal}</span>
            </div>
            <div class="info-row" style="margin-bottom: 10px;">
              <span>Delivery Fee:</span>
              <span>₹${order.deliveryFee}</span>
            </div>
            <div class="info-row" style="margin-bottom: 10px;">
              <span>Tax:</span>
              <span>₹${order.tax}</span>
            </div>
            <div class="total-row">
              <span>TOTAL:</span>
              <span>₹${order.total}</span>
            </div>
          </div>

          <p style="color: #666; font-size: 13px;">Order placed on: ${order.orderTime}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default { sendOrderConfirmationEmail };