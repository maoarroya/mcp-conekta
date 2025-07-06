import { Configuration } from 'conekta/configuration';
import { CustomersApi, OrdersApi, ChargesApi } from 'conekta/api';
import { 
  Customer, 
  CustomerResponse, 
  OrderRequest, 
  OrderResponse, 
  ChargeRequest, 
  ChargeOrderResponse,
  TransferResponse 
} from 'conekta/model';

// Initialize configuration
const configuration = new Configuration({
  apiKey: process.env.CONEKTA_API_KEY || '',
  basePath: 'https://api.conekta.io'
});

// Initialize API clients
const customersApi = new CustomersApi(configuration);
const ordersApi = new OrdersApi(configuration);
const chargesApi = new ChargesApi(configuration);

// Service Error Type
export interface ConektaServiceError {
  status: number;
  message: string;
  details?: any;
}

// Service Functions
export const createCustomer = async (customerData: Customer): Promise<CustomerResponse> => {
  try {
    const response = await customersApi.createCustomer(customerData);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Error al crear el cliente',
      details: error.response?.data || error
    } as ConektaServiceError;
  }
};

export const getCustomerById = async (customerId: string): Promise<CustomerResponse> => {
  try {
    const response = await customersApi.getCustomerById(customerId);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Error al obtener el cliente',
      details: error.response?.data || error
    } as ConektaServiceError;
  }
};

export const updateCustomer = async (customerId: string, updateData: any): Promise<CustomerResponse> => {
  try {
    const response = await customersApi.updateCustomer(customerId, updateData);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Error al actualizar el cliente',
      details: error.response?.data || error
    } as ConektaServiceError;
  }
};

export const createOrder = async (orderData: OrderRequest): Promise<OrderResponse> => {
  try {
    const response = await ordersApi.createOrder(orderData);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Error al crear la orden',
      details: error.response?.data || error
    } as ConektaServiceError;
  }
};

export const getOrderById = async (orderId: string): Promise<OrderResponse> => {
  try {
    const response = await ordersApi.getOrderById(orderId);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Error al obtener la orden',
      details: error.response?.data || error
    } as ConektaServiceError;
  }
};

export const updateOrder = async (orderId: string, updateData: any): Promise<OrderResponse> => {
  try {
    const response = await ordersApi.updateOrder(orderId, updateData);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Error al actualizar la orden',
      details: error.response?.data || error
    } as ConektaServiceError;
  }
};

export const createCharge = async (orderId: string, chargeData: ChargeRequest): Promise<ChargeOrderResponse> => {
  try {
    const response = await chargesApi.ordersCreateCharge(orderId, chargeData);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Error al procesar el cargo',
      details: error.response?.data || error
    } as ConektaServiceError;
  }
};

export const createRefund = async (orderId: string, refundData: any): Promise<any> => {
  try {
    const response = await ordersApi.orderRefund(orderId, refundData);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Error al procesar el reembolso',
      details: error.response?.data || error
    } as ConektaServiceError;
  }
};

export const captureOrder = async (orderId: string): Promise<OrderResponse> => {
  try {
    const response = await ordersApi.ordersCreateCapture(orderId);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Error al capturar la orden',
      details: error.response?.data || error
    } as ConektaServiceError;
  }
};

// Validation functions
export const validateCustomerData = (data: any): data is Customer => {
  return typeof data === 'object' &&
         typeof data.name === 'string' &&
         typeof data.email === 'string';
};

export const validateOrderData = (data: any): data is OrderRequest => {
  return typeof data === 'object' &&
         typeof data.currency === 'string' &&
         typeof data.customer_info === 'object' &&
         typeof data.customer_info.name === 'string' &&
         typeof data.customer_info.email === 'string' &&
         Array.isArray(data.line_items) &&
         data.line_items.length > 0;
};

export const validateChargeData = (data: any): data is ChargeRequest => {
  return typeof data === 'object' &&
         typeof data.payment_method === 'object' &&
         typeof data.payment_method.type === 'string';
};
