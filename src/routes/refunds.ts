import { Router } from 'express';
import { createRefund } from '../services/conektaService';

const router = Router();

// Create refund for an order
router.post('/:orderId/refunds', async (req, res) => {
  try {
    const refund = await createRefund(req.params.orderId, req.body);
    res.json(refund);
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message, details: err.details });
  }
});

export default router;
