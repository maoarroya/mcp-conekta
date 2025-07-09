# Pagos únicos con tarjeta - Tokenizer - Tokenizador

En esta documentación explicamos cómo aceptar pagos únicos con **Tarjetas de crédito y débito** a través del **Component** (sin necesidad de guardar la tarjeta). Podrás utilizar todo el poder de nuestra API de Pagos con un front end pre-diseñado, que se adapta a las necesidades de tu negocio en línea.

[block:image]
{
"images": [
{
"image": [
"https://files.readme.io/4fa6f9e-sequence-diagram-cargo-unico-componente.drawio.png",
"sequence-diagram-cargo-unico-componente.drawio.png",
1100
],
"align": "center",
"sizing": "auto"
}
]
}
[/block]

## Configurar tu Servidor

### Instalar el SDK de Conekta

Instala el SDK de Conekta para el lenguaje de programación de tu preferencia.

```csharp
dotnet add package Conekta.net
```

```python
pip install conekta
```

```ruby
gem install conekta
```

```javascript
npm install conekta
```

```go
go get -u github.com/conekta/conekta-go
```

```java
<dependency>
  <groupId>io.conekta</groupId>
  <artifactId>ct-conekta-java</artifactId>
  <version>6.0.0</version>
  <scope>compile</scope>
</dependency>
```

## Crear un Customer (opcional)

Cuando tienes cargos únicos, no es necesario generar un customer en Conekta, pues no vas a asociar ningún método de pago recurrente a éste. Sin embargo si quisieras almacenar en Conekta esta información, puedes seguir las instrucciones.

Con la siguiente llamada crearás un **customer** y obtendrás un **customer_id** el cual podrás guardar para realizar cobros en el futuro a la misma persona.

```curl
curl --location --request POST 'https://api.conekta.io/customers' \
	--header 'Accept: application/vnd.conekta-v2.2.0+json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer key_DwaOLXoX6YCGGvfNifZ3IPwi' \
  --data-raw '{
  	"name": "Felipe Gomez",
    "email": "felipegomez@mail.com"
  }'
```

```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Conekta.net.Api;
using Conekta.net.Client;
using Conekta.net.Model;

namespace Example
{
    public class CreateCustomerExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            // Configure Bearer token for authorization: bearerAuth
            config.AccessToken = "key_xxxx";

            var apiInstance = new CustomersApi(config);
            var customer = new(
                name: "test dot",
                phone: "+573143159063",
                email: "test@conekta.com",
                corporate: true,
                planId: "plan_2tXx672QLQ68CkmMn",
                defaultShippingContactId: "",
                defaultPaymentSourceId: "",
                customReference: "dotnet_12345678"
            );
            var acceptLanguage = "es";  // string | Use for knowing which language to use (optional)  (default to es)

            try
            {
                // Create customer
                CustomerResponse result = apiInstance.CreateCustomer(customer, acceptLanguage);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling CustomersApi.CreateCustomer: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

```python
import conekta
import time
from conekta.rest import ApiException
from pprint import pprint

configuration = conekta.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

with conekta.ApiClient(configuration) as api_client:
    api_instance = conekta.CustomersApi(api_client)
    customer = conekta.Customer(
        email='customer@customer.com',
        name='Customer Name',
        phone='5534343434'
    )
    accept_language = 'es'

    try:
        # Create Customer
        api_response = api_instance.create_customer(customer, accept_language=accept_language)
        print("The response of CustomersApi->create_customer:\n")
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling CustomersApi->create_customer: %s\n" % e)

```

```ruby
require 'time'
require 'conekta'
# setup authorization
Conekta.configure do |config|
  # Configure Bearer authorization: bearerAuth
  config.access_token = 'key_xxxx'
end

api_instance = Conekta::CustomersApi.new
customer = Conekta::Customer.new({email: 'miguel@gmail.com', name: 'miguel', phone: '+5215555555555'}) # Customer | requested field for customer
opts = {
  accept_language: 'es' # String | Use for knowing which language to use
}

begin
  # Create customer
  result = api_instance.create_customer(customer, opts)
  p result
rescue Conekta::ApiError => e
  puts "Error when calling CustomersApi->create_customer: #{e}"
end
```

```javascript
import { CustomersApi, Configuration, Customer, CustomerResponse } from "conekta";

const apikey = "key_xxxxx";
const config = new Configuration({ accessToken: apikey });
const client = new CustomersApi(config);

const customer: Customer = {
  name: "John Constantine",
  email: "frank@google.com",
  phone: "+5215555555555"
}

client.createCustomer(customer).then(response => {
  const customerResponse = response.data as CustomerResponse;
  console.log(customerResponse.id);
}).catch(error => {
  console.error("here", error);
});
```

```go
package main

import (
	"context"
	"fmt"
	"io"
	"net/http"

	"github.com/conekta/conekta-go"
)

func main() {
	const acceptLanguage = "es"
	cfg := conekta.NewConfiguration()
	client := conekta.NewAPIClient(cfg)
	ctx := context.WithValue(context.TODO(), conekta.ContextAccessToken, "key_DwaOLXoX6YCGGvfNifZ3IPwi")
	req := conekta.Customer{
		Name:            "test dot",
		Phone:           "+573143159063",
		Email:           "test@conekta.com",
		Corporate:       conekta.PtrBool(true),
		PlanId:          conekta.PtrString("plan_2tXx672QLQ68CkmMn"),
		CustomReference: conekta.PtrString("go_12345678"),
	}
	customer, response, err := client.CustomersApi.CreateCustomer(ctx).Customer(req).AcceptLanguage(acceptLanguage).Execute()
	if err != nil {
		panic(err)
	}
	if response.StatusCode != http.StatusCreated {
		responseBody, err := io.ReadAll(response.Body)
		if err != nil {
			panic(err)
		}
		panic(fmt.Sprintf("response body: %s", responseBody))
	}
	fmt.Printf("customer: %v", customer)
}
```

```java
import com.conekta.*;
import com.conekta.auth.*;
import com.conekta.model.*;
import com.conekta.CustomersApi;

public class CustomersApiExample {

    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();

        // Configure HTTP bearer authorization: bearerAuth
        HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
        bearerAuth.setBearerToken("key_xxxx");

        CustomersApi apiInstance = new CustomersApi(defaultClient);
        Customer customer = new Customer(); // Customer | requested field for customer
        customer.setName("Customer Name");
        customer.setEmail("customer@mail.com");
        customer.setPhone("55454545454");
        String acceptLanguage = "es";
        try {
            CustomerResponse result = apiInstance.createCustomer(customer, acceptLanguage,null);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling CustomersApi#createCustomer");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
```

> 🚧 Importante:
>
> Si ya tienes un **customer_id** asociado al usuario al que quieres cobrar, no es necesario que realices este paso de nuevo.

## Crear una página de pago en el cliente.

### Inicializar el Component para tokenizar

Carga nuestro paquete de JavaScript para mantenerte en cumplimiento con PCI asegurando que los detalles de pago sean enviados directamente a Conekta sin pasar por tu servidor.

Inicializa el Component con tu [Llave Pública](https://developers.conekta.com/docs/como-obtener-tus-api-keys) para completar el pago desde el cliente:

```html index.html
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
        backgroundMode: "lightMode", //lightMode o darkMode
        colorPrimary: "#081133", //botones y bordes
        colorText: "#585987", // títulos
        colorLabel: "#585987", // input labels
        inputType: "minimalMode", // minimalMode o flatMode
      };
      const config = {
        locale: "es",
        publicKey: "{{yourKey}}",
        targetIFrame: "#example",
      };

      const callbacks = {
        // Evento que permitirá saber que el token se creado de forma satisfactoria, es importante que se consuman los datos que de él derivan.
        onCreateTokenSucceeded: function (token) {
          console.log("token", token);
        },
        // Evento que permitirá saber que el token se creado de manera incorrecta, es importante que se consuman los datos que de él derivan y se hagan las correciones pertinentes.
        onCreateTokenError: function (error) {
          console.log(error);
        },
        // Evento que notifica cuando finalizó la carga del component/tokenizer
        onGetInfoSuccess: function (loadingTime) {
          console.log("loading time en milisegundos", loadingTime.initLoadTime);
        },
      };
      window.ConektaCheckoutComponents.Card({
        config,
        callbacks,
        options,
      });
    </script>
  </body>
</html>
```

_Así se visualiza el componente al renderizar_

![](https://files.readme.io/94e9243-Desktop_3.png "Desktop (3).png")

Con el Component inicializado en tu página de registro, tu usuario solo deberá llenar la información de la tarjeta y ejecutar el registro de la misma.

Una vez confirmada la tokenización y registro de la tarjeta, se generará un evento _onCreateTokenSucceeded_ si el registro fue exitoso o si el registro es incorrecto se generará el evento _onCreateTokenError_.

```json onCreateTokenSucceeded
"tok_2q6cyio5sDqCyvYh7"
```

```json onCreateTokenError
{
  "details": [
    {
      "debug_message": "Unrecognized access key.",
      "message": "Acceso no autorizado.",
      "param": null,
      "code": "conekta.errors.authentication.unrecognized_key"
    }
  ],
  "object": "error",
  "type": "authentication_error",
  "log_id": null
}
```

Por último, una vez obtenido el token de la tarjeta, envíalo a tu BackEnd para la creación de la orden con esta tarjeta. Recuerda que este token tiene una expiración de 10 minutos y solo se puede utilizar 1 vez para hacer un pago.

## Crear una Orden (obligatorio)

> 📘 ¿Qué es una Orden?
>
> Una Orden representa la intención de compra/pago de tu cliente. Incluye todos los detalles relacionados a los métodos de pago, información de envío, lista de productos a comprar/pagar, cargos, descuentos, impuestos, o cualquier información que se requiera por el negocio para documentar la transacción.

La [orden](ref:createorder) requiere de cierta información que se obtiene ya sea de algún servicio interno del negocio, o directamente del FrontEnd al solicitarla al usuario/cliente final. Los datos principales traducidos a atributos del request son:

- ¿Quién está pagando? -> Customer
- ¿Qué está pagando? -> Line_items
- ¿Cuánto está pagando? -> Unit_pice multiplicado por Quantity
- ¿Cuál es el método de pago? -> Payment_method
- ¿Información extra requerida por el negocio? -> Metadata

Al iniciar, agrega el _endpoint_ en tu servidor para crear una [Orden](ref:createorder).

#### Request

```curl cURL Request
-H "Accept: application/vnd.conekta-v2.2.0+json" \
-H "Content-type: application/json" \
-u key_YOUR_PRIVATE_API_KEY: \
-X POST -d '{
"line_items": [{
     "name": "Nombre del Producto o Servicio",
     "unit_price": 23000,
     "quantity": 1
   }],
   "currency": "MXN",
   "customer_info": {
     "name": "Jorge Martínez",
     "email": "jorge.martinez@conekta.com",
     "phone": "+5218181818181"
   },
    "metadata":{
     "datos_extra": "1234"
   },
   "charges":[{
     "payment_method": {
       "type": "card",
       "token_id": "tok_2q6cyio5sDqCyvYh7"
     }
   }]
}’https://api.conekta.io/orders
```

```json Response
{
    "livemode": false,
    "amount": 23000,
    "currency": "MXN",
    "payment_status": "paid",
    "amount_refunded": 0,
    "customer_info": {
        "email": "jorge.martinez@conekta.com",
        "phone": "+5218181818181",
        "name": "Jorge Martínez",
        "object": "customer_info"
    },
    "object": "order",
    "id": "ord_2tQAKpPrfkdyzZvfM",
    "metadata": {**
        "datos_extra": "1234"
    },
    "is_refundable": true,
    "created_at": 1676929549,
    "updated_at": 1676929551,
    "line_items": {
        "object": "list",
        "has_more": false,
        "data": [
            {
                "name": "Nombre del Producto o Servicio",
                "unit_price": 23000,
                "quantity": 1,
                "object": "line_item",
                "id": "line_item_2tQAKpPrfkdyzZvfK",
                "parent_id": "ord_2tQAKpPrfkdyzZvfM",
                "metadata": {},
                "antifraud_info": {}
            }
        ]
    },
    "charges": {
        "object": "list",
        "has_more": false,
        "data": [
            {
                "id": "63f3ea0d88dc6c0019a3fe39",
                "livemode": false,
                "created_at": 1676929549,
                "currency": "MXN",
                "device_fingerprint": "e6edc7bb5ca296c0c61acb60ad20d083",
                "payment_method": {
                    "name": "ESTEFANIA ALBARRAN",
                    "exp_month": "12",
                    "exp_year": "23",
                    "auth_code": "731650",
                    "object": "card_payment",
                    "type": "credit",
                    "last4": "4242",
                    "brand": "visa",
                    "issuer": "banamex",
                    "account_type": "BANAMEX",
                    "country": "MX",
                    "fraud_indicators": []
                },
                "object": "charge",
                "description": "Payment from order",
                "status": "paid",
                "amount": 23000,
                "paid_at": 1676929550,
                "fee": 1255,
                "customer_id": "",
                "order_id": "ord_2tQAKpPrfkdyzZvfM"
            }
        ]
    }
}
```

Con esto has finalizado el proceso de pago. Con este request puedes recibir el resultado de un pago exitoso, alguna declinación por el Sistema Antifraude de Conekta o una declinación Bancaria. Muestra el mensaje de respuesta a tu cliente como mejor le convenga a tu negocio.

## Capturar eventos del pago

Automatiza tus procesos a través de los eventos que se generan en el flujo de pago. Para recibir estos eventos y ejecutar acciones sigue la guía de [webhooks](doc:eventos-webhooks)

Te recomendamos capturar los siguientes eventos:

| Evento                | Descripción                                                    |
| :-------------------- | :------------------------------------------------------------- |
| order.paid            | Enviado cuando el cliente completa un pago de forma exitosa    |
| order.pending_payment | Enviado cuando una orden es creada pero está pendiente de pago |
| order.declined        | Enviado cuando el pago de una orden es declinado.              |

Al capturar estos eventos podrás tomar acciones postventa como:

- Ejecutar un flujo de logística.
- Actualizar tus bases de datos de órdenes.
- Actualizar tus sistemas contables.
