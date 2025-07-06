"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const charges_1 = __importDefault(require("./routes/charges"));
const customers_1 = __importDefault(require("./routes/customers"));
const orders_1 = __importDefault(require("./routes/orders"));
const refunds_1 = __importDefault(require("./routes/refunds"));
const webhooks_1 = __importDefault(require("./routes/webhooks"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/mcp/charges', charges_1.default);
app.use('/mcp/customers', customers_1.default);
app.use('/mcp/orders', orders_1.default);
app.use('/mcp/refunds', refunds_1.default);
app.use('/mcp/webhooks', webhooks_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`MCP server running on port ${port}`);
});
