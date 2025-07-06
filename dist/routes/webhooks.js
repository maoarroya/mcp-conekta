"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Webhook endpoint for Conekta events
router.post('/', async (req, res) => {
    try {
        const event = req.body;
        console.log('🔔 Webhook recibido:', JSON.stringify(event, null, 2));
        // Handle different event types
        switch (event.type) {
            case 'order.created':
                console.log('📦 Nueva orden creada:', event.data.object.id);
                break;
            case 'order.paid':
                console.log('💳 Orden pagada:', event.data.object.id);
                break;
            case 'order.canceled':
                console.log('❌ Orden cancelada:', event.data.object.id);
                break;
            case 'charge.created':
                console.log('🔄 Nuevo cargo creado:', event.data.object.id);
                break;
            case 'charge.paid':
                console.log('✅ Cargo pagado:', event.data.object.id);
                break;
            case 'charge.declined':
                console.log('🚫 Cargo rechazado:', event.data.object.id);
                break;
            case 'customer.created':
                console.log('👤 Nuevo cliente creado:', event.data.object.id);
                break;
            default:
                console.log('📋 Evento no manejado:', event.type);
        }
        // Always respond with 200 OK to acknowledge receipt
        res.status(200).json({ received: true, event_type: event.type });
    }
    catch (error) {
        console.error('❌ Error procesando webhook:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.default = router;
