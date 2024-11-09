![Banner](./../images/banner.png)

# PROYECTO 7: Demo

**DEMO EN PRODUCCIÓN:** https://sevenm-fullstack-m7-proy.onrender.com/

La aplicación de comercio electrónico Fullstack demo es un ejemplo práctico que ilustra cómo crear y conectar una aplicación frontend y backend utilizando tecnologías modernas. 

El proyecto está diseñado para demostrar cómo se puede crear una aplicación de comercio electrónico funcional y segura que gestione productos, autenticación y autorización de usuarios, y pasarelas de pago.


## Planteamiento

El objetivo principal de este proyecto demo es proporcionar una base sólida y una guía para desarrollar una aplicación de comercio electrónico Fullstack. Este demostrativo deberá ilustrar cómo se conectan y comunican entre sí el frontend y el backend, y cómo se gestionan los datos y la seguridad en la aplicación.

La estructura de carpetas del proyecto demo es la siguiente:

```
demo
├── client (frontend)
└── server (backend)
```

El frontend de la aplicación está desarrollado en React y utiliza vite para facilitar el desarrollo y construcción. La arquitectura de carpetas del frontend incluye componentes, contextos y rutas para gestionar la navegación y el estado en la aplicación. Además, se utiliza TailwindCSS para el diseño y estilos.

El backend está desarrollado en Express.js y utiliza jsonwebtoken para la autenticación y autorización de usuarios. Los controladores, modelos y rutas están organizados en sus respectivas carpetas, lo que permite una fácil gestión y mantenimiento del código. La base de datos MongoDB es utilizada para almacenar datos de productos y usuarios, y se integra mediante mongoose.

Ambas partes del proyecto (frontend y backend) se comunican a través de llamadas a la API utilizando axios. El servidor se configura para manejar solicitudes desde el cliente y responder con datos apropiados en función de las rutas y la autenticación del usuario.

## Requerimientos

Para este demostrativo, se necesitará desarrollar y conectar las siguientes partes del proyecto:

- Frontend: Una aplicación web creada con React que incluya rutas, componentes y manejo de estados.
- Backend: Un servidor Express.js que proporcione API y maneje la lógica del negocio, autenticación y autorización.
- Base de datos: MongoDB para almacenar y gestionar datos de productos y usuarios.
- Pasarela de pago: Integración con una pasarela de pago segura como PayPal o MercadoPago.

## Instalación

- Abrir tres terminales.
- En la primer terminal, levantaremos el cliente:

```shell

$ cd demo/client
$ npm install
$ npm run build
$ npm run dev

```

- En la segunda terminal, levantaremos el servidor:

```shell

$ cd demo/server
$ npm install
$ npm run dev

```

- En la tercera terminal, levantaremos `Stripe CLI`:

```shell
$ stripe listen --forward-to localhost:3005/api/checkout/create-order --events=charge.succeeded
```
> En caso de que no tengas Stripe CLI, te recomendamos instalarlo aqui mismo: https://stripe.com/docs/stripe-cli?locale=es-419

## Solución

La aplicación Fullstack de comercio electrónico se divide en dos partes principales: el cliente (frontend) y el servidor (backend). A continuación, se detalla cómo se conectan y organizan las carpetas y archivos en cada parte.

### Cliente (Frontend)
El frontend de la aplicación se basa en React y utiliza la siguiente estructura de carpetas:

**src:** Contiene todos los archivos de código fuente, incluyendo componentes, rutas y contextos.

**assets:** Almacena archivos de imágenes y otros recursos estáticos utilizados en la aplicación.

**components:** Contiene los componentes de React organizados por funcionalidad (Auth, Checkout, Home, Layout, Pizzas y Profile).
Cada carpeta tiene sus propios componentes que corresponden a las distintas funcionalidades, como el inicio de sesión, registro, lista de productos, etc.

**config:** Incluye archivos de configuración como `axios.js`, que configura la instancia de Axios para realizar llamadas a la API, y `token.js`, que ayuda a manejar el token de autenticación.

- Config:
    - **axios.js** Este archivo crea una instancia de Axios, que es una biblioteca popular para realizar solicitudes HTTP en aplicaciones de JavaScript. La instancia se configura con una URL base, que se obtiene de las variables de entorno en import.meta.env.`VITE_REACT_APP_BACKEND_URL`. Esta URL base se utilizará para todas las solicitudes realizadas con esta instancia de Axios, lo que facilita la gestión de llamadas a la API en toda la aplicación.

    - **token.js**: Este archivo exporta una función llamada `getToken`, que se encarga de gestionar el token de autenticación del usuario. Cuando un usuario inicia sesión o se registra, recibe un token de autenticación que se almacena en el almacenamiento local del navegador. La función `getToken` verifica si hay un token en el almacenamiento local y, si existe, lo agrega como un encabezado `x-auth-token` en la instancia de `Axios`. De esta manera, todas las solicitudes realizadas con esta instancia de `Axios` incluirán automáticamente el token de autenticación, lo que facilita el acceso a rutas protegidas en el servidor. 
    Si no hay un token en el almacenamiento local, la función eliminará el encabezado `x-auth-token` de la instancia de Axios, asegurándose de que no se envíe un token inválido en futuras solicitudes.


**context:** Contiene los contextos y estados globales de la aplicación, organizados en tres subcarpetas: Alert, Pizza y User. Cada subcarpeta incluye un archivo Context, un archivo Reducer y un archivo State.

- Alert:

    -  **AlertContext.jsx**: Define el contexto de Alert y proporciona una forma de acceder a él en los componentes que lo necesiten.
    -  **AlertReducer.js:** Define las acciones y cómo manipular el estado global de Alert basado en esas acciones.
    -  **AlertState.jsx:** Configura y proporciona el estado global y las funciones para interactuar con el contexto de Alert.

- Pizza:

    -  **PizzaContext.jsx:** Define el contexto de Pizza y proporciona una forma de acceder a él en los componentes que lo necesiten.
    -  **PizzaReducer.js:** Define las acciones y cómo manipular el estado global de Pizza basado en esas acciones.
    -  **PizzaState.jsx:** Configura y proporciona el estado global y las funciones para interactuar con el contexto de Pizza.

- User:

    -  **UserContext.jsx:** Define el contexto de User y proporciona una forma de acceder a él en los componentes que lo necesiten.
    -  **UserReducer.js:** Define las acciones y cómo manipular el estado global de User basado en esas acciones.
    -  **UserState.jsx:** Configura y proporciona el estado global y las funciones para interactuar con el contexto de User.

Cada archivo de estado (`*State.jsx`) envuelve los componentes hijos con su respectivo `*Context.Provider` y pasa el estado y las funciones a través de la propiedad `value`. De esta manera, los componentes que necesiten acceder a estos contextos y estados globales pueden hacerlo utilizando el hook `useContext` de React y consumiendo el contexto apropiado.


**routes:** Incluye los componentes de rutas para manejar la navegación privada y pública en función de la autenticación del usuario.

- Routes

    - **Auth.jsx:** Este archivo maneja las rutas públicas, como el inicio de sesión y el registro, que no requieren autenticación. Aquí se definen las rutas para los componentes `Login` y `Register` y se utilizan con el componente `Route` de `react-router-dom`. Si un usuario ya está autenticado, las rutas públicas lo redirigirán al componente Home para evitar el acceso no deseado a las páginas de inicio de sesión y registro.

    - **Private.jsx:** Este archivo maneja las rutas privadas, que requieren autenticación del usuario. Contiene un componente `PrivateRoute`, que envuelve a las rutas y verifica si el usuario está autenticado antes de permitir el acceso a los componentes protegidos, como el perfil y el carrito de compras. Si un usuario no está autenticado, el componente `PrivateRoute` redirigirá al usuario al componente de inicio de sesión.

**main.jsx:** El punto de entrada principal de la aplicación de React, donde se configura y renderiza el componente principal Router.
Servidor (Backend)


### Servidor (Backend)

El backend de la aplicación se basa en `Express.js` y utiliza la siguiente estructura de carpetas:

**config:** Contiene archivos de configuración como db.js, que configura la conexión a la base de datos MongoDB, y initialMock.js, que inicializa datos de muestra en la base de datos.

**controllers:** Incluye los controladores para manejar las solicitudes de la API y realizar acciones específicas en función de la lógica del negocio (`checkoutController.js`, `pizzaController.js` y `userController.js`).

**middleware:** Contiene middlewares personalizados, como `authorization.js`, que maneja la autenticación y autorización de usuarios en las rutas protegidas.

**models:** Define los modelos de datos para la base de datos MongoDB (`Cart.js`, `Pizza.js` y `User.js`) utilizando `mongoose`.

**routes:** Incluye los archivos de rutas de Express.js que definen las rutas de la API y enlazan las solicitudes a los controladores correspondientes (`checkout.js`, `pizzas.js` y `users.js`).

**index.js:** El punto de entrada principal del servidor `Express.js`, donde se configuran y se inician todos los componentes necesarios, como la conexión a la base de datos, los middlewares y las rutas.

## Conexión entre Cliente y Servidor

El cliente y el servidor se comunican mediante llamadas a la API utilizando `axios`. 

El frontend utiliza la instancia de Axios configurada en `src/config/axios.js` para realizar llamadas a la API del backend. El backend maneja las solicitudes de la API y devuelve respuestas en función de la lógica del negocio y la autenticación del usuario.

El componente `src/Router.jsx` en el frontend define las rutas de la aplicación y sus componentes asociados. Las rutas públicas y privadas se manejan mediante los componentes `src/routes/Auth.jsx` y `src/routes/Private.jsx`, que se encargan de verificar la autenticación del usuario antes de permitir el acceso a ciertas partes de la aplicación. Cuando un usuario inicia sesión o se registra, el backend genera un token de autenticación que se almacena en el cliente y se utiliza para acceder a las rutas protegidas.

En el cliente, los estados globales se manejan mediante contextos y reducers (`Alert`, `Pizza` y `User`) ubicados en la carpeta `src/context`. Estos contextos permiten compartir y gestionar el estado entre los distintos componentes de la aplicación. Por ejemplo, el contexto de usuario maneja el estado de autenticación, y el contexto de pizza maneja el estado de los productos disponibles.

Los componentes en el frontend realizan llamadas a la API del backend para obtener, crear, actualizar y eliminar datos según las acciones del usuario, como agregar productos al carrito, realizar un pedido, actualizar el perfil del usuario, etc. Estas acciones se ejecutan a través de los controladores en el backend que interactúan con la base de datos MongoDB utilizando los modelos definidos en la carpeta models.

El middleware de autorización `middleware/authorization.js` en el backend se encarga de verificar el token de autenticación enviado desde el cliente en las rutas protegidas. Si el token es válido, el middleware permite que la solicitud continúe; de lo contrario, devuelve un error de autenticación.

El cliente y el servidor se conectan y comunican entre sí mediante llamadas a la API y el intercambio de tokens de autenticación. El frontend maneja la presentación y la interacción del usuario, mientras que el backend se encarga de la lógica del negocio y la persistencia de datos en la base de datos. Ambas partes trabajan juntas para ofrecer una experiencia fluida de comercio electrónico a los usuarios.


## Despliegue

El despliegue fue ejecutado directamente en render.com, tanto para el frontend como el backend. Solo es importante declarar que son dos proyectos distintos. 

Uno será para el backend y otro para el frontend, y en ambos, se selecciona el mismo repositorio.

Observa con cuidado la configuración para React, la cual fue un `static site`.

![](./../images/render-01.png)
