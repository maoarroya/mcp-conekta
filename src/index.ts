import express from 'express';
import dotenv from 'dotenv';
import chargesRouter from './routes/charges';
import customersRouter from './routes/customers';
import ordersRouter from './routes/orders';
import refundsRouter from './routes/refunds';
import webhooksRouter from './routes/webhooks';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/mcp/charges', chargesRouter);
app.use('/mcp/customers', customersRouter);
app.use('/mcp/orders', ordersRouter);
app.use('/mcp/refunds', refundsRouter);
app.use('/mcp/webhooks', webhooksRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MCP server running on port ${port}`);
});
