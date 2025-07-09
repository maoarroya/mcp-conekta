# Crear una página de pago en el cliente

## Inicializar el Component

Carga nuestro paquete de JavaScript para mantenerte en cumplimiento con PCI asegurando que los detalles de pago sean enviados directamente a Conekta sin pasar por tu servidor.

Inicializa el Component con tu Llave Pública para completar el pago desde el Cliente:

### Ejemplo: index.html

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>Checkout</title>
    <script
      crossorigin
      src="https://pay.conekta.com/v1.0/js/conekta-checkout.min.js"
    ></script>
    <!-- En este archivo esta la config del componente -->
  </head>
  <body>
    <div id="example" style="height: 714px"></div>
    <script type="text/javascript">
      const options = {
        backgroundMode: 'lightMode', //lightMode o darkMode
        colorPrimary: '#081133', //botones y bordes
        colorText: '#585987', // títulos
        colorLabel: '#585987', // input labels
        inputType: 'minimalMode', // minimalMode o flatMode
      };
      const config = {
        locale: 'es',
        publicKey: '{{yourKey}}',
        targetIFrame: '#example',
        checkoutRequestId: '{{checkoutRequestId}}',
      };

      const callbacks = {
        // Evento que notifica cuando finalizó la carga del component/tokenizer
        onGetInfoSuccess: function (loadingTime) {
          console.log('loading time en milisegundos', loadingTime.initLoadTime);
        },
        // Evento que notifica cuando finalizó el pago correctamente
        onFinalizePayment: function (order) {
          console.log('success: ', JSON.stringify(order));
        },
        // Evento que notifica cuando finalizó la carga del component/tokenizer
        onErrorPayment: function (error) {
          console.log('error en pago: ', error);
        },
      };
      window.ConektaCheckoutComponents.Integration({
        config,
        callbacks,
        options
      });
    </script>

  </body>
</html>
```

## Notas importantes

**Altura fija**: Con la configuración anterior tu componente de pago tendrá un alto fijo. Si el contenido del componente de pago es más alto que el definido aparecerá un scroll automáticamente.

**Altura adaptativa**: Si quieres que tu componente de pago no tenga un alto fijo sino que se adapte al alto del contenido puedes hacerlo evitando establecer el alto al contenedor y agregando el atributo `autoResize: true` a las options.

### Ejemplo con altura adaptativa:

```html
<div id="example"></div>
<script type="text/javascript">
  const options = {
    backgroundMode: 'lightMode',
    colorPrimary: '#081133',
    colorText: '#585987',
    colorLabel: '#585987',
    inputType: 'minimalMode',
    autoResize: true // Permite que el componente se adapte automáticamente
  };
  
  const config = {
    locale: 'es',
    publicKey: '{{yourKey}}',
    targetIFrame: '#example',
    checkoutRequestId: '{{checkoutRequestId}}',
  };
  
  const callbacks = {
    onGetInfoSuccess: function (loadingTime) {
      console.log('loading time en milisegundos', loadingTime.initLoadTime);
    },
    onFinalizePayment: function (order) {
      console.log('success: ', JSON.stringify(order));
    },
    onErrorPayment: function (error) {
      console.log('error en pago: ', error);
    },
  };
  
  window.ConektaCheckoutComponents.Integration({
    config,
    callbacks,
    options
  });
</script>
```

## Configuración de opciones

### Options disponibles:
- `backgroundMode`: `'lightMode'` o `'darkMode'`
- `colorPrimary`: Color principal para botones y bordes
- `colorText`: Color de los títulos
- `colorLabel`: Color de las etiquetas de los inputs
- `inputType`: `'minimalMode'` o `'flatMode'`
- `autoResize`: `true` para altura adaptativa, `false` para altura fija

### Config requerido:
- `locale`: Idioma del componente (ej: `'es'`)
- `publicKey`: Tu llave pública de Conekta
- `targetIFrame`: Selector del elemento donde se montará el componente
- `checkoutRequestId`: ID de la solicitud de checkout generada desde tu backend

### Callbacks disponibles:
- `onGetInfoSuccess`: Se ejecuta cuando el componente se carga exitosamente
- `onFinalizePayment`: Se ejecuta cuando el pago se completa correctamente
- `onErrorPayment`: Se ejecuta cuando ocurre un error en el pago
