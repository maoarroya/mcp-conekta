import { Router } from 'express';
import { createCharge } from '../services/conektaService';

const router = Router();

// Create charge for an order
router.post('/:orderId/charges', async (req, res) => {
  try {
    const charge = await createCharge(req.params.orderId, req.body);
    res.json(charge);
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message, details: err.details });
  }
});

export default router;
