# Pagos únicos con Component

En esta documentación explicamos cómo aceptar pagos únicos con **Tarjeta (crédito y débito), Transferencia electrónica y Efectivo** a través del **Component** (sin necesidad de guardar la tarjeta). Podrás utilizar todo el poder de nuestra API de Pagos con un front end pre-diseñado, que se adapta a las necesidades de tu negocio en línea.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b2863e1-Proceso_Component.png",
        "Proceso Component.png",
        1656
      ],
      "align": "center",
      "sizing": "auto"
    }
  ]
}
[/block]


## Configurar tu Servidor

### Instalar el SDK de Conekta

Instala el **SDK** de Conekta para el lenguaje de programación de tu preferencia.

```csharp
dotnet add package Conekta.net
```
```python Python
pip install conekta
```
```ruby Ruby
gem install conekta
```
```javascript JavaScript
npm install conekta
```
```go Go
go get -u github.com/conekta/conekta-go
```
```java
<dependency>
  <groupId>io.conekta</groupId>
  <artifactId>ct-conekta-java</artifactId>
  <version>6.1.0</version>
  <scope>compile</scope>
</dependency>
```

## Crear un customer (opcional)

Cuando tienes cargos únicos, no es necesario generar un customer en Conekta, pues no vas a asociar ningún método de pago recurrente a éste. Sin embargo si quisieras almacenar en Conekta esta información, puedes seguir las instrucciones.

Con la siguiente llamada crearás un **customer** y obtendrás un **customer_id** el cual podrás guardar para realizar cobros en el futuro a la misma persona.

```curl
curl --location --request POST 'https://api.conekta.io/customers' \
	--header 'Accept: application/vnd.conekta-v2.2.0+json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer key_XXXXXXX' \
  --data-raw '{
  	"name": "Felipe Gomez",
    "email": "felipegomez@mail.com",
    "phone": "3143159054"
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
            config.AccessToken = "API_KEY";

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
    access_token = os.environ["API_KEY"]
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
  config.access_token = 'API_KEY'
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

const apikey = "API_KEY";
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
```go Go
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
	ctx := context.WithValue(context.TODO(), conekta.ContextAccessToken, "$API_KEY")
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
        bearerAuth.setBearerToken("API_KEY");

        CustomersApi apiInstance = new CustomersApi(defaultClient);
        Customer customer = new Customer(); // Customer | requested field for customer
        customer.setName("Customer Name");
        customer.setEmail("customer@mail.com");
        customer.setPhone("55454545454");
        String acceptLanguage = "es"; // String | Use for knowing which language to use
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

## Crear orden con la configuración de tus métodos de pago (obligatorio)

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

#### Para habilitar los métodos de pago dentro del request:

Utiliza el atributo **allowed_payment_methods** en el objeto **checkout** de la orden al momento de crearla.

- Para habilitar la opción de pago con Tarjeta utiliza la palabra: "card"
- Para habilitar la opción de pago con Transferencia Bancaria utiliza la palabra: "brank_transfer"
- Para habilitar la opción de pago con Efectivo utiliza la palabra: "cash"

#### Request

```curl cURL Request
-H "Accept: application/vnd.conekta-v2.1.0+json" \
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
   "checkout": {
     		"type": "Integration",
        "allowed_payment_methods": ["card", "bank_transfer, "cash"] //Habilita todos los metodos de pago
     }
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

Una vez creada la orden deberás obtener el Checkout ID asociado para inicializar el Component embebido en tu página de Checkout.

## Crear una página de pago en el cliente.

### Inicializar el Component

Carga nuestro paquete de JavaScript para mantenerte en cumplimiento con PCI asegurando que los detalles de pago sean enviados directamente a Conekta sin pasar por tu servidor.

Inicializa el **Component** con tu [Llave Pública](https://developers.conekta.com/docs/como-obtener-tus-api-keys) para completar el pago desde el Cliente:

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
      // options es opcional, si se setea height al div container la prop autoResize no funcionará, se debe usar uno u otro
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

**Nota:** Con la configuración anterior tu componente de pago tendrá un alto fijo,si el contenido del componente de pago es más alto que el definido aparecerá un scroll automaticamente.

Si quieres que tu componente de pago no tenga un alto fijo sino que se adapte al alto del contenido puedes hacerlo evitando establecer el alto al contenedor y agregando el atributo_ **autoresize: true**_ a las options.

<br />

```html index.html
<html>
  ...
  <body>
    <div id="example"></div>  <!-- contenedor sin height -->
    <script type="text/javascript">
      const options = {
        ...,
        autoResize: true // activamos el autoResize
      };
       </script>
  </body>
</html>

```

Con el Component inicializado en tu Checkout, tu usuario solo deberá seleccionar el método de pago que desee utilizar y seguir las instrucciones para concretar la compra.

El componente renderizado con los 3 métodos de pago habilitados, deberá verse así en tu sitio o aplicación:

![](https://files.readme.io/436a44391d8ba758d231f74e8b4ded1c70cbd449057b05187ba587491e8eba1c-image.png)

Si solo activaste un método de pago deberá visualizarse así:

#### **Tarjeta**

![](https://files.readme.io/60c6d7f-image.png)

#### **Transferencia**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5967382-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "400px"
    }
  ]
}
[/block]


#### **Cash**

**Pagos con Conekta Efectivo** 

![](https://files.readme.io/1e40aab3d1c463c82eb69e134a14794ff1cc03a5647ed87f6c7c8a7c55cfa28f-image.png)

<br />

```json onFinalizePayment
{
    "id": "ord_2sxz1L8TSv8RufVZV",
    "reference": "646180111812345678",
    "charge": {
        "id": "638e615afede9b001793237e",
        "currency": "MXN",
        "payment_method": {
            "type": "card"
        },
        "status": "pending_payment",
        "customer_id": "",
        "order_id": "ord_2sxz1L8TSv8RufVZV"
    },
    "metaData": {}
}
```

Por último, una vez confirmado el pago, se generará un evento _onFinalizePayment_ en el Cliente el cual te mostrará la información de la orden y el cargo. En este momento podrás tomar decisiones relacionadas con el estado de la compra como re-direccionar a una página de pago exitoso o a una página con el resumen de la compra.

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