"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conektaService_1 = require("../services/conektaService");
const router = (0, express_1.Router)();
// Create charge for an order
router.post('/:orderId/charges', async (req, res) => {
    try {
        const charge = await (0, conektaService_1.createCharge)(req.params.orderId, req.body);
        res.json(charge);
    }
    catch (err) {
        res.status(err.status || 500).json({ error: err.message, details: err.details });
    }
});
exports.default = router;
