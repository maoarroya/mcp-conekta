import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an MCP server for Conekta payment components
const server = new McpServer({
  name: "conekta-payment-components",
  version: "1.0.0",
});

// Helper function to read documentation files
function readDocumentationFile(filename) {
  try {
    const filePath = join(__dirname, "data", filename);
    return readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return null;
  }
}

// Helper function to extract code examples from markdown
function extractCodeExamples(markdown) {
  const codeBlocks = [];
  const htmlMatches = markdown.match(/```html[\s\S]*?```/g);
  const jsMatches = markdown.match(/```javascript[\s\S]*?```/g);

  if (htmlMatches) {
    htmlMatches.forEach((match) => {
      codeBlocks.push({
        type: "html",
        code: match.replace(/```html\n?/, "").replace(/```$/, ""),
      });
    });
  }

  if (jsMatches) {
    jsMatches.forEach((match) => {
      codeBlocks.push({
        type: "javascript",
        code: match.replace(/```javascript\n?/, "").replace(/```$/, ""),
      });
    });
  }

  return codeBlocks;
}

// Tool: Read Payment Component Documentation
server.registerTool(
  "readPaymentComponentDocs",
  {
    title: "Read Payment Component Documentation",
    description:
      "Read and parse Conekta payment component documentation to understand how to implement embedded checkout components",
    inputSchema: {
      filename: z
        .string()
        .optional()
        .describe("Documentation filename (default: pagosUnicosComponent.md)"),
    },
  },
  async (props) => {
    console.error("props", props);
    const { filename = "pagosUnicosComponent.md" } = props;
    const documentation = readDocumentationFile(filename);

    if (!documentation) {
      return `Error: Could not read documentation file ${filename}`;
    }

    const codeExamples = extractCodeExamples(documentation);
    
    let response = `Documentación cargada exitosamente desde ${filename}:

${documentation}

Ejemplos de código encontrados: ${codeExamples.length}`;

    if (codeExamples.length > 0) {
      response += "\n\nEjemplos extraídos:";
      codeExamples.forEach((example, index) => {
        response += `\n\n--- Ejemplo ${index + 1} (${example.type}) ---\n${example.code}`;
      });
    }

    return response;
  }
);

// Tool: Generate Payment Component HTML
server.registerTool(
  "generatePaymentComponentHTML",
  {
    title: "Generate Payment Component HTML",
    description:
      "Generate HTML code for Conekta payment component based on documentation and custom parameters",
    inputSchema: {
      publicKey: z.string().optional().describe("Conekta public key"),
      checkoutRequestId: z.string().optional().describe("Checkout request ID"),
      containerId: z
        .string()
        .optional()
        .describe("Container element ID (default: 'conekta-checkout')"),
      colorPrimary: z
        .string()
        .optional()
        .describe("Primary color for buttons and borders (default: '#081133')"),
      colorText: z
        .string()
        .optional()
        .describe("Text color for titles (default: '#585987')"),
      colorLabel: z
        .string()
        .optional()
        .describe("Label color for inputs (default: '#585987')"),
      backgroundMode: z
        .enum(["lightMode", "darkMode"])
        .optional()
        .describe("Background mode (default: 'lightMode')"),
      inputType: z
        .enum(["minimalMode", "flatMode"])
        .optional()
        .describe("Input type (default: 'minimalMode')"),
      autoResize: z
        .boolean()
        .optional()
        .describe("Auto-resize component to content (default: false)"),
      height: z
        .string()
        .optional()
        .describe("Fixed height for component (default: '714px')"),
    },
  },
  async (params) => {
    const {
      publicKey = "",
      checkoutRequestId = "",
      containerId = "conekta-checkout",
      colorPrimary = "#081133",
      colorText = "#585987",
      colorLabel = "#585987",
      backgroundMode = "lightMode",
      inputType = "minimalMode",
      autoResize = false,
      height = "714px",
    } = params;

    const containerStyle = autoResize ? "" : `style="height: ${height}"`;

    const htmlCode = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Conekta Checkout</title>
    <script
      crossorigin
      src="https://pay.conekta.com/v1.0/js/conekta-checkout.min.js"
    ></script>
  </head>
  <body>
    <div id="${containerId}" ${containerStyle}></div>
    <script type="text/javascript">
      const options = {
        backgroundMode: '${backgroundMode}',
        colorPrimary: '${colorPrimary}',
        colorText: '${colorText}',
        colorLabel: '${colorLabel}',
        inputType: '${inputType}',${
      autoResize ? "\n        autoResize: true," : ""
    }
      };
      
      const config = {
        locale: 'es',
        publicKey: '${publicKey}',
        targetIFrame: '#${containerId}',
        checkoutRequestId: '${checkoutRequestId}',
      };

      const callbacks = {
        onGetInfoSuccess: function (loadingTime) {
          console.log('Component loaded successfully. Loading time:', loadingTime.initLoadTime, 'ms');
        },
        onFinalizePayment: function (order) {
          console.log('Payment completed successfully:', JSON.stringify(order));
          // Add your success logic here
        },
        onErrorPayment: function (error) {
          console.error('Payment error:', error);
          // Add your error handling logic here
        },
      };

      window.ConektaCheckoutComponents.Integration({
        config,
        callbacks,
        options
      });
    </script>
  </body>
</html>`;

    return `HTML code generated successfully for Conekta payment component:

${htmlCode}

Configuration used:
- Public Key: ${publicKey}
- Checkout Request ID: ${checkoutRequestId}
- Container ID: ${containerId}
- Background Mode: ${backgroundMode}
- Auto Resize: ${autoResize}
- Height: ${height}

Instructions: Copy the HTML code above and replace the publicKey and checkoutRequestId with your actual values. The component will render a complete payment form.`;
  }
);

// Tool: Get Payment Component Configuration
server.registerTool(
  "getPaymentComponentConfig",
  {
    title: "Get Payment Component Configuration",
    description:
      "Get information about available configuration options for Conekta payment components",
    inputSchema: {},
  },
  async () => {
    const configInfo = {
      required: {
        publicKey: "Your Conekta public key",
        checkoutRequestId: "The checkout request ID from your backend",
      },
      optional: {
        containerId: "HTML element ID for the component container",
        colorPrimary: "Primary color for buttons and borders (hex color)",
        colorText: "Text color for titles (hex color)",
        colorLabel: "Label color for inputs (hex color)",
        backgroundMode: "lightMode or darkMode",
        inputType: "minimalMode or flatMode",
        autoResize:
          "true/false - whether component should auto-resize to content",
        height: "Fixed height when autoResize is false (e.g., '714px')",
      },
      callbacks: {
        onGetInfoSuccess: "Called when component loads successfully",
        onFinalizePayment: "Called when payment is completed",
        onErrorPayment: "Called when payment fails",
      },
      examples: {
        basicUsage:
          "Use generatePaymentComponentHTML with just publicKey and checkoutRequestId",
        customStyling:
          "Add colorPrimary, colorText, backgroundMode for custom styling",
        responsive: "Set autoResize: true for responsive component",
      },
    };

    return `Conekta Payment Component Configuration Options:

REQUIRED PARAMETERS:
- publicKey: ${configInfo.required.publicKey}
- checkoutRequestId: ${configInfo.required.checkoutRequestId}

OPTIONAL PARAMETERS:
- containerId: ${configInfo.optional.containerId}
- colorPrimary: ${configInfo.optional.colorPrimary}
- colorText: ${configInfo.optional.colorText}
- colorLabel: ${configInfo.optional.colorLabel}
- backgroundMode: ${configInfo.optional.backgroundMode}
- inputType: ${configInfo.optional.inputType}
- autoResize: ${configInfo.optional.autoResize}
- height: ${configInfo.optional.height}

AVAILABLE CALLBACKS:
- onGetInfoSuccess: ${configInfo.callbacks.onGetInfoSuccess}
- onFinalizePayment: ${configInfo.callbacks.onFinalizePayment}
- onErrorPayment: ${configInfo.callbacks.onErrorPayment}

USAGE EXAMPLES:
- Basic usage: ${configInfo.examples.basicUsage}
- Custom styling: ${configInfo.examples.customStyling}
- Responsive: ${configInfo.examples.responsive}`;
  }
);

// Resources temporarily commented out due to compatibility issues
// Will be re-enabled once tools are working properly

/*
// Resource: Payment Component Documentation
server.registerResource(
  "payment-docs",
  new ResourceTemplate("conekta://docs/{filename}", { list: ["pagosUnicosComponent.md"] }),
  {
    title: "Conekta Payment Component Documentation",
    description: "Access to Conekta payment component documentation files",
  },
  async (uri, { filename }) => {
    const documentation = readDocumentationFile(filename);
    
    if (!documentation) {
      return {
        contents: [{
          uri: uri.href,
          text: `Error: Could not read documentation file ${filename}`
        }]
      };
    }

    return {
      contents: [{
        uri: uri.href,
        text: documentation,
        mimeType: "text/markdown"
      }]
    };
  }
);
*/

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
