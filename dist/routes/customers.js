"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conektaService_1 = require("../services/conektaService");
const router = (0, express_1.Router)();
// Create customer
router.post('/', async (req, res) => {
    try {
        const customer = await (0, conektaService_1.createCustomer)(req.body);
        res.json(customer);
    }
    catch (err) {
        res.status(err.status || 500).json({ error: err.message, details: err.details });
    }
});
exports.default = router;
