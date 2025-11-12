import express from 'express';
import { placeOrder } from '../services/orderService';

const router = express.Router();

router.post('/place-order', async (req, res) => {
    try {
        const orderData = req.body;
        const result = await placeOrder(orderData);
        res.status(200).json({ message: 'Order placed successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
});

export default router;