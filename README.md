# MCP Conekta API

A Node.js/TypeScript API wrapper for Conekta payment processing using the official Conekta SDK v6.0.3.

## Features

- ✅ **Proper TypeScript Support**: Uses official Conekta SDK v6.0.3 with full type safety
- 🔄 **Modern API Structure**: Uses the new OpenAPI-generated Conekta SDK
- 🎯 **Complete CRUD Operations**: Support for customers, orders, charges, and refunds
- 📡 **Webhook Handling**: Comprehensive webhook event processing
- 🛡️ **Error Handling**: Structured error responses with proper HTTP status codes
- 🔍 **Input Validation**: Data validation for all API endpoints

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
CONEKTA_API_KEY=your_conekta_api_key_here
CONEKTA_API_VERSION=2.1.0
PORT=3000
```

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Build for production
npm run build

# Run in production
npm start
```

## API Endpoints

### Customers

- **POST** `/mcp/customers` - Create a new customer
- **GET** `/mcp/customers/:id` - Get customer by ID
- **PUT** `/mcp/customers/:id` - Update customer

### Orders

- **POST** `/mcp/orders` - Create a new order
- **GET** `/mcp/orders/:id` - Get order by ID
- **PUT** `/mcp/orders/:id` - Update order
- **POST** `/mcp/orders/:id/capture` - Capture a pre-authorized order

### Charges

- **POST** `/mcp/charges/:orderId/charges` - Create a charge for an order

### Refunds

- **POST** `/mcp/refunds/:orderId/refunds` - Create a refund for an order

### Webhooks

- **POST** `/mcp/webhooks` - Webhook endpoint for Conekta events

## Supported Webhook Events

The API handles the following Conekta webhook events:

- `order.created` - New order created
- `order.paid` - Order payment completed
- `order.canceled` - Order canceled
- `charge.created` - New charge created
- `charge.paid` - Charge payment completed
- `charge.declined` - Charge declined
- `customer.created` - New customer created

## Example Usage

### Create a Customer

```bash
curl -X POST http://localhost:3000/mcp/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+525555555555"
  }'
```

### Create an Order

```bash
curl -X POST http://localhost:3000/mcp/orders \
  -H "Content-Type: application/json" \
  -d '{
    "currency": "MXN",
    "customer_info": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+525555555555"
    },
    "line_items": [
      {
        "name": "Product 1",
        "unit_price": 10000,
        "quantity": 1
      }
    ]
  }'
```

### Create a Charge

```bash
curl -X POST http://localhost:3000/mcp/charges/ord_123/charges \
  -H "Content-Type: application/json" \
  -d '{
    "payment_method": {
      "type": "card",
      "token_id": "tok_123"
    }
  }'
```

## Project Structure

```
src/
├── index.ts              # Main application entry point
├── routes/               # API route handlers
│   ├── customers.ts      # Customer routes
│   ├── orders.ts         # Order routes
│   ├── charges.ts        # Charge routes
│   ├── refunds.ts        # Refund routes
│   └── webhooks.ts       # Webhook routes
└── services/
    └── conektaService.ts # Conekta API service layer
```

## TypeScript Integration

This project uses the official Conekta SDK v6.0.3 with full TypeScript support:

- **API Classes**: `CustomersApi`, `OrdersApi`, `ChargesApi`
- **Model Types**: `Customer`, `Order`, `ChargeRequest`, `OrderResponse`, etc.
- **Configuration**: Centralized API configuration with proper authentication
- **Error Handling**: Structured error responses with proper typing

## Error Handling

All API responses include proper error handling with:

- HTTP status codes
- Descriptive error messages
- Detailed error information for debugging

Example error response:
```json
{
  "error": "Error al crear el cliente",
  "details": {
    "message": "Invalid email format",
    "field": "email"
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License 