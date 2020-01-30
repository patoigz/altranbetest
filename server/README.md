## Altran backend test

## REST API

### Introducción

El servidor está construido con tecnologías nodejs, express y utiliza base de datos en mongo.
Se configuran diferentes comandos para poder iniciar el servidor. Se da sentado que existe instanciado un servicio de mongodb ejecutándose en la pc.
Para iniciar la instalación de los módulos de node, ejecutar:

-   npm install

Para iniciar el servidor ejecutar el comando:

-   npm run start

```no-highlight
Una vez iniciado el servidor, se creará una base de datos con el nombre "servertestdb", en el que se insertará la información descargada de mocky.io correspondiente a clientes y pólizas.
```

Para ejecutar los casos de test ejecutar el comando:

-   npm run test

Se incorpora además docker compose para configurar el ambiente.
Para iniciar se debe ejecutar:

-   1. docker-compose build
    2. docker-compose up

## Consideraciones

Para tener acceso a la api de cliente y poliza. El usuario se debe autenticar y obtener un token. Si su rol se verifica, el mismo podrá acceder a los endpoints.
Se probee una colección en POSTMAN con ejemplos de todos los requests posibles.

## Autenticación

Para obtener el token de acceso.

**<code>POST /auth/login </code>**

**<code>Headers: "Content-Type: application/json" </code>**

```no-highlight
Body:
{
    "id": "bcdc8948-ae7b-4bbd-955a-b98489a55e80"
}

Response:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...."
}
```

#### Se obtiene como respuesta el ACCESS_TOKEN. Y se tendrá en cuenta el rol del cliente para acceder a los endpoints. Si es de tipo "user" o bien "admin"

## API

Apis propuestas para la resolución de la problemática.

1. api/client
2. api/policy

#### Nota: Todo acceso a la api debe llevar en el contenido del header: "Authorization" : ACCESS_TOKEN

## api/client

**<code>GET /all </code>**

**Retorna la lista de todos los clientes**

**_Permiso requerido: role = "user" o role = "admin"_**

---

**<code>GET /findByClientId/:\_id </code>**

**Retorna la información de un cliente en particular por su ID**

**_Permiso requerido: role = "user" o role = "admin"_**

---

**<code>GET /findByClientName/:\_name </code>**

**Retorna la información de un cliente en particular por su NOMBRE (case insensitive)**

**_Permiso requerido: role = "user" o role = "admin"_**

---

---

## api/policy

**<code>GET /all </code>**

**Retorna la lista de todas las pólizas**

**_Permiso requerido: role = "admin"_**

---

**<code>GET /findClientByPolicyId/:\_id </code>**

**Retorna el cliente vinculado al número de póliza indicada**

**_Permiso requerido: role = "admin"_**

---

**<code>GET /findByClientId/:\_id </code>**

**Retorna todas las pólizas de un cliente en particular por su ID**

**_Permiso requerido: role = "admin"_**

---

**<code>GET /findByClientName/:\_name </code>**

**Retorna todas las pólizas de un cliente en particular por su NOMBRE (case insensitive)**

**_Permiso requerido: role = "admin"_**

---

---

## Algunos ejemplos de respuestas:

## api/client

**<code>GET api/client/all </code>**

```JSON
{
    "clients": [
        {
            "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
            "name": "Britney",
            "email": "britneyblankenship@quotezart.com",
            "role": "admin",
            "__v": 0
        },
        {
            "id": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
            "name": "Manning",
            "email": "manningblankenship@quotezart.com",
            "role": "admin",
            "__v": 0
        },
      ..........]
}
```

---

**<code>GET api/client/findByClientName/gutHrIE </code>**

```JSON
{
    "name": "Guthrie",
    "email": "guthrieblankenship@quotezart.com",
    "__v": 0
}
```

---

**<code>GET api/client/findByClientId/a0ece5db-cd14-4f21-812f-966633e7be86 </code>**

```JSON
{
    "name": "Britney",
    "email": "britneyblankenship@quotezart.com",
    "__v": 0
}
```

---

---

## api/policy

**<code>GET api/policy/findClientByPolicyId/84d2812f-49be-4a71-8ea8-f24759528a6f </code>**

```JSON
{
    "client": {
        "_id": "5e331446b442023aa89e4ecf",
        "id": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
        "name": "Manning",
        "email": "manningblankenship@quotezart.com",
        "role": "admin",
        "__v": 0
    }
}
```

---

**<code>GET api/policy/findByClientName/Britney </code>**

```JSON
[
    {
        "_id": "5e331446b442023aa89e4f91",
        "installmentPayment": true,
        "id": "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
        "amountInsured": 399.89,
        "email": "inesblankenship@quotezart.com",
        "inceptionDate": "2015-07-06T06:55:49.000Z",
        "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86",
        "__v": 0
    },
    {
        "_id": "5e331446b442023aa89e4f93",
        "installmentPayment": false,
        "id": "6f514ec4-1726-4628-974d-20afe4da130c",
        "amountInsured": 697.04,
        "email": "inesblankenship@quotezart.com",
        "inceptionDate": "2014-09-12T12:10:23.000Z",
        "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86",
        "__v": 0
    }
..........]
```

**<code>GET api/policy/findByClientName/guThriE </code>**

```JSON
[
    {
        "_id": "5e331446b442023aa89e5051",
        "installmentPayment": true,
        "id": "facd2c78-65f0-4a49-8a66-560109d263ba",
        "amountInsured": 1261.56,
        "email": "guthrieblankenship@quotezart.com",
        "inceptionDate": "2020-01-30T07:12:05.000Z",
        "clientId": "a6757b3f-c138-47bf-a43e-defde945c6d0",
        "__v": 0
    }
]
```
