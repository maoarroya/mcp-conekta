"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChargeData = exports.validateOrderData = exports.validateCustomerData = exports.captureOrder = exports.createRefund = exports.createCharge = exports.updateOrder = exports.getOrderById = exports.createOrder = exports.updateCustomer = exports.getCustomerById = exports.createCustomer = void 0;
const configuration_1 = require("conekta/configuration");
const api_1 = require("conekta/api");
// Initialize configuration
const configuration = new configuration_1.Configuration({
    apiKey: process.env.CONEKTA_API_KEY || '',
    basePath: 'https://api.conekta.io'
});
// Initialize API clients
const customersApi = new api_1.CustomersApi(configuration);
const ordersApi = new api_1.OrdersApi(configuration);
const chargesApi = new api_1.ChargesApi(configuration);
// Service Functions
const createCustomer = async (customerData) => {
    try {
        const response = await customersApi.createCustomer(customerData);
        return response.data;
    }
    catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error al crear el cliente',
            details: error.response?.data || error
        };
    }
};
exports.createCustomer = createCustomer;
const getCustomerById = async (customerId) => {
    try {
        const response = await customersApi.getCustomerById(customerId);
        return response.data;
    }
    catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error al obtener el cliente',
            details: error.response?.data || error
        };
    }
};
exports.getCustomerById = getCustomerById;
const updateCustomer = async (customerId, updateData) => {
    try {
        const response = await customersApi.updateCustomer(customerId, updateData);
        return response.data;
    }
    catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error al actualizar el cliente',
            details: error.response?.data || error
        };
    }
};
exports.updateCustomer = updateCustomer;
const createOrder = async (orderData) => {
    try {
        const response = await ordersApi.createOrder(orderData);
        return response.data;
    }
    catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error al crear la orden',
            details: error.response?.data || error
        };
    }
};
exports.createOrder = createOrder;
const getOrderById = async (orderId) => {
    try {
        const response = await ordersApi.getOrderById(orderId);
        return response.data;
    }
    catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error al obtener la orden',
            details: error.response?.data || error
        };
    }
};
exports.getOrderById = getOrderById;
const updateOrder = async (orderId, updateData) => {
    try {
        const response = await ordersApi.updateOrder(orderId, updateData);
        return response.data;
    }
    catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error al actualizar la orden',
            details: error.response?.data || error
        };
    }
};
exports.updateOrder = updateOrder;
const createCharge = async (orderId, chargeData) => {
    try {
        const response = await chargesApi.ordersCreateCharge(orderId, chargeData);
        return response.data;
    }
    catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error al procesar el cargo',
            details: error.response?.data || error
        };
    }
};
exports.createCharge = createCharge;
const createRefund = async (orderId, refundData) => {
    try {
        const response = await ordersApi.orderRefund(orderId, refundData);
        return response.data;
    }
    catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error al procesar el reembolso',
            details: error.response?.data || error
        };
    }
};
exports.createRefund = createRefund;
const captureOrder = async (orderId) => {
    try {
        const response = await ordersApi.ordersCreateCapture(orderId);
        return response.data;
    }
    catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error al capturar la orden',
            details: error.response?.data || error
        };
    }
};
exports.captureOrder = captureOrder;
// Validation functions
const validateCustomerData = (data) => {
    return typeof data === 'object' &&
        typeof data.name === 'string' &&
        typeof data.email === 'string';
};
exports.validateCustomerData = validateCustomerData;
const validateOrderData = (data) => {
    return typeof data === 'object' &&
        typeof data.currency === 'string' &&
        typeof data.customer_info === 'object' &&
        typeof data.customer_info.name === 'string' &&
        typeof data.customer_info.email === 'string' &&
        Array.isArray(data.line_items) &&
        data.line_items.length > 0;
};
exports.validateOrderData = validateOrderData;
const validateChargeData = (data) => {
    return typeof data === 'object' &&
        typeof data.payment_method === 'object' &&
        typeof data.payment_method.type === 'string';
};
exports.validateChargeData = validateChargeData;
