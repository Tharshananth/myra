import nodemailer from 'nodemailer';
import { EmailConfig, OrderData } from '../types/index';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendOrderConfirmationEmail = async (orderData: OrderData) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: orderData.email,
        subject: 'Order Confirmation',
        text: `Thank you for your order, ${orderData.name}! Your order details are as follows:\n\n` +
              `Order ID: ${orderData.orderId}\n` +
              `Items: ${orderData.items.join(', ')}\n` +
              `Total: ${orderData.total}\n\n` +
              `We will notify you once your order is shipped.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};