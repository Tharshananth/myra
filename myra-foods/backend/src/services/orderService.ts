export const placeOrder = async (orderData) => {
    // Validate order data
    if (!orderData.name || !orderData.email || !orderData.address) {
        throw new Error("Missing required fields");
    }

    // Format order data
    const formattedOrder = {
        name: orderData.name,
        email: orderData.email,
        address: orderData.address,
        landmark: orderData.landmark || '',
        review: orderData.review || '',
        items: orderData.items,
    };

    // Send order confirmation email
    await sendOrderConfirmationEmail(formattedOrder);
};

const sendOrderConfirmationEmail = async (order) => {
    const emailContent = `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order, ${order.name}!</p>
        <p>Your order details:</p>
        <ul>
            ${order.items.map(item => `<li>${item.name} - ${item.quantity}</li>`).join('')}
        </ul>
        <p>Shipping to: ${order.address}, ${order.landmark}</p>
        <p>Review: ${order.review}</p>
    `;

    // Use the email service to send the email
    await emailService.sendEmail({
        to: order.email,
        subject: 'Order Confirmation',
        html: emailContent,
    });
};