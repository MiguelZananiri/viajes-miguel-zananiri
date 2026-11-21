# TILL Airlines

## Descripcion

Aplicacion web creada en react para una aerolinea simulada.

Permitiendo al usuario ver los destinos disponibles con sus vuelos y hoteles.

En este proyecto se ha utilizado MSW para simular un backend y GraphQL para recibir peticiones de la API.

## Tecnologias utilizadas

- HTML5: Cuerpo de la pagina.
- CSS: Diseño y estilo.
- JavaScript: Logica y funcionalidades.
- React: Desarrollo de componentes e interfaces dinamicas.
- React Router: Enrutamiento dinamico en la navegacion.
- Vite: Herramienta de desarrollo y compilacion del proyecto.
- Bootstrap: Componentes de diseño responsivo.
- MSW: Biblioteca de desarrollo para la simulacion de respuestas backend.
- GraphQL: Lenguaje de consulta y manipulacion de datos para APIs.

## Destinos

La pagina de destinos permite ver la informacion de los destinos.

Mostrando informacion como:

- Ciudad
- Pais
- Actividad popular

Ademas, se puede consultar los vuelos y los hoteles de ese destino al interactuar con los elementos de la pagina.

## Vuelos y hoteles

### Vuelos

La pagina de vuelos permite ver la informacion del vuelo para el destino seleccinado.

Mostrando informacion como:

- Nombre del vuelo
- Precio
- Fecha disponible
- Disponibilidad

### Hoteles

Mientras que la pagina de hoteles muestra la informacion del hotel del destino seleccionado.

Mostrando informacion como:

- Nombre del hotel
- Precio
- Disponibilidad

## Detalle vuelo y detalle hotel

Al seleccionar «Ver detalle» en un vuelo o un hotel se mostrara en detalle la informacion.

React Router lee el ID del destino y el ID del vuelo o del hotel desde la URL, y de esta manera se mostrara la informacion mediante GraphQL.

## Uso de MSW y GraphQL

El proyecto utiliza MSW para interceptar las peticiones de la aplicacion y simular las respuestas de un backend.

- REST: con `GET /api/destinos` devuelve el listado de destinos con su informacion.
- GraphQL: la consulta `obtenerOpcionesDestino` recibe el ID del destino seleccionado y devuelve sus vuelos y hoteles. La aplicacion usa esos datos para mostrar los listados y el detalle de cada opcion.

## Como ejecutar el proyecto

Para ejecutar el proyecto es necesario tener Node.js y npm con Vite instalados en el computador.

Descarga el codigo en ZIP o con `git clone`.

En la terminal accede al directorio del proyecto con `cd`

Instalar las dependencias con el siguiente comando:

```bash
npm install
```

Por ultimo iniciar el proyecto con el siguiente comando:

```bash
npm run dev
```

Una vez iniciado la terminal mostrara la direccion local el cual puedes acceder desde el navegador:

```text
http://localhost:5173/