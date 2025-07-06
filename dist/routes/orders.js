"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conektaService_1 = require("../services/conektaService");
const router = (0, express_1.Router)();
// Create order
router.post('/', async (req, res) => {
    try {
        const order = await (0, conektaService_1.createOrder)(req.body);
        res.json(order);
    }
    catch (err) {
        res.status(err.status || 500).json({ error: err.message, details: err.details });
    }
});
// Get order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await (0, conektaService_1.getOrderById)(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(err.status || 500).json({ error: err.message, details: err.details });
    }
});
// Update order
router.put('/:id', async (req, res) => {
    try {
        const order = await (0, conektaService_1.updateOrder)(req.params.id, req.body);
        res.json(order);
    }
    catch (err) {
        res.status(err.status || 500).json({ error: err.message, details: err.details });
    }
});
// Capture order
router.post('/:id/capture', async (req, res) => {
    try {
        const order = await (0, conektaService_1.captureOrder)(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(err.status || 500).json({ error: err.message, details: err.details });
    }
});
exports.default = router;
