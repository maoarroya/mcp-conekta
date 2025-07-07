# Conekta Payment Components MCP Server

Este es un servidor MCP (Model Context Protocol) que permite a los LLMs acceder a documentación de componentes de pago de Conekta y generar código HTML/JavaScript para checkout embebido.

## Características

- 🔍 **Lectura de Documentación**: Lee y parsea archivos de documentación en formato Markdown
- 🛠️ **Generación de Código**: Genera código HTML/JavaScript listo para usar
- 🎨 **Personalización**: Permite personalizar colores, estilos y comportamiento
- 📋 **Plantillas**: Proporciona plantillas predefinidas para casos comunes
- 🔧 **Configuración**: Información completa sobre opciones de configuración

## Instalación

```bash
npm install
```

## Uso

### Ejecutar el servidor MCP

```bash
npm run mcp-server
```

### Ejecutar en modo desarrollo

```bash
npm run mcp-server:dev
```

## Herramientas Disponibles

### 1. `readPaymentComponentDocs`
Lee y parsea documentación de componentes de pago desde archivos Markdown.

**Parámetros:**
- `filename` (opcional): Nombre del archivo de documentación (por defecto: "paymentComponent.md")

**Ejemplo de uso:**
```javascript
{
  "filename": "paymentComponent.md"
}
```

### 2. `generatePaymentComponentHTML`
Genera código HTML completo para un componente de pago de Conekta.

**Parámetros requeridos:**
- `publicKey`: Tu llave pública de Conekta
- `checkoutRequestId`: ID de la solicitud de checkout

**Parámetros opcionales:**
- `containerId`: ID del elemento contenedor (por defecto: "conekta-checkout")
- `colorPrimary`: Color primario para botones y bordes (por defecto: "#081133")
- `colorText`: Color de texto para títulos (por defecto: "#585987")
- `colorLabel`: Color de etiquetas para inputs (por defecto: "#585987")
- `backgroundMode`: "lightMode" o "darkMode" (por defecto: "lightMode")
- `inputType`: "minimalMode" o "flatMode" (por defecto: "minimalMode")
- `autoResize`: Auto-redimensionar al contenido (por defecto: false)
- `height`: Altura fija cuando autoResize es false (por defecto: "714px")

**Ejemplo de uso:**
```javascript
{
  "publicKey": "key_your_public_key",
  "checkoutRequestId": "checkout_request_id_here",
  "colorPrimary": "#6366f1",
  "backgroundMode": "darkMode",
  "autoResize": true
}
```

### 3. `getPaymentComponentConfig`
Obtiene información sobre todas las opciones de configuración disponibles.

**Sin parámetros requeridos**

## Recursos Disponibles

### 1. `payment-docs`
Acceso a archivos de documentación de componentes de pago.

**URIs disponibles:**
- `conekta://docs/paymentComponent.md`

### 2. `payment-templates`
Plantillas predefinidas para casos comunes de uso.

**URIs disponibles:**
- `conekta://templates/basic` - Implementación básica
- `conekta://templates/custom-styling` - Con estilos personalizados
- `conekta://templates/responsive` - Componente responsivo
- `conekta://templates/with-callbacks` - Con callbacks completos

## Configuración MCP

Para usar este servidor con un cliente MCP, agrega la siguiente configuración:

```json
{
  "mcpServers": {
    "conekta-payment-components": {
      "command": "node",
      "args": ["src/mcp-server.js"],
      "cwd": "/path/to/mcp-conekta",
      "env": {}
    }
  }
}
```

## Estructura de Archivos

```
mcp-conekta/
├── src/
│   ├── mcp-server.js          # Servidor MCP principal
│   ├── mcp-config.json        # Configuración del servidor
│   └── data/
│       └── paymentComponent.md # Documentación de componentes
├── package.json
└── MCP-README.md
```

## Ejemplo de Uso con Claude Desktop

Si usas Claude Desktop, puedes configurar el servidor MCP agregando esto a tu configuración:

```json
{
  "mcpServers": {
    "conekta-payment-components": {
      "command": "node",
      "args": ["src/mcp-server.js"],
      "cwd": "/path/to/your/mcp-conekta",
      "env": {}
    }
  }
}
```

Luego puedes preguntarle a Claude cosas como:

- "¿Puedes leer la documentación de componentes de pago de Conekta?"
- "Genera un formulario de pago con estilo oscuro y auto-redimensionamiento"
- "¿Cuáles son las opciones de configuración disponibles?"
- "Muéstrame una plantilla básica para pagos"

## Agregar Nueva Documentación

Para agregar nueva documentación:

1. Crea un archivo `.md` en `src/data/`
2. Actualiza la lista de archivos en el recurso `payment-docs`
3. Reinicia el servidor MCP

## Desarrollo

El servidor está escrito en JavaScript ES modules y usa el SDK oficial de MCP. Para desarrollo:

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run mcp-server:dev
```

## Dependencias

- `@modelcontextprotocol/sdk`: SDK oficial de MCP
- `zod`: Validación de esquemas
- Node.js built-ins: `fs`, `path`, `url` 