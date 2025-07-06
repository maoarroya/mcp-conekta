"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conektaService_1 = require("../services/conektaService");
const router = (0, express_1.Router)();
// Create refund for an order
router.post('/:orderId/refunds', async (req, res) => {
    try {
        const refund = await (0, conektaService_1.createRefund)(req.params.orderId, req.body);
        res.json(refund);
    }
    catch (err) {
        res.status(err.status || 500).json({ error: err.message, details: err.details });
    }
});
exports.default = router;
