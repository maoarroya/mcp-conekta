import { Router } from 'express';
import { createOrder, getOrderById, updateOrder, captureOrder } from '../services/conektaService';

const router = Router();

// Create order
router.post('/', async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.json(order);
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message, details: err.details });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    res.json(order);
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message, details: err.details });
  }
});

// Update order
router.put('/:id', async (req, res) => {
  try {
    const order = await updateOrder(req.params.id, req.body);
    res.json(order);
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message, details: err.details });
  }
});

// Capture order
router.post('/:id/capture', async (req, res) => {
  try {
    const order = await captureOrder(req.params.id);
    res.json(order);
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message, details: err.details });
  }
});

export default router;
