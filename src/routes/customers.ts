import { Router } from 'express';
import { createCustomer } from '../services/conektaService';

const router = Router();

// Create customer
router.post('/', async (req, res) => {
  try {
    const customer = await createCustomer(req.body);
    res.json(customer);
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message, details: err.details });
  }
});

export default router;
