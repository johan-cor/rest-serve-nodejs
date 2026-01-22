# REST Server (NodeJS)

Este proyecto es una base sólida para un **REST Server** construido con Node.js y Express. Implementa una arquitectura basada en clases, controladores y rutas separadas para mantener el código organizado y escalable.

## Características

- Arquitectura limpia (Modelo Servidor, Rutas, Controladores).
- Servidor REST con endpoints para CRUD básico (GET, POST, PUT, DELETE, PATCH).
- Configuración de CORS habilitada.
- Parseo automático del body (JSON).
- Manejo de variables de entorno con [dotenv](https://www.npmjs.com/package/dotenv).
- Contenido estático público habilitado.

## Instalación

1. Clona el repositorio o descarga el código.
2. Navega a la carpeta del proyecto.
3. Instala las dependencias:

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto para configurar tus variables de entorno. Puedes usar el siguiente ejemplo:

```env
PORT=8080
```

> **Nota:** El puerto por defecto si no se configura es el `3000`.

## Ejecución

**Modo Desarrollo (con nodemon):**
```bash
npm run dev
```

**Modo Producción:**
```bash
npm start
```

## Endpoints

La ruta base para los usuarios es `/api/usuarios`.

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| GET    | `/api/usuarios` | Obtener usuarios (soporta query params como `?q=hola&nombre=pedro`). |
| POST   | `/api/usuarios` | Crear un nuevo usuario (recibe JSON body). |
| PUT    | `/api/usuarios/:id` | Actualizar un usuario por ID. |
| DELETE | `/api/usuarios` | Borrar un usuario. |
| PATCH  | `/api/usuarios` | Actualización parcial. |

## Estructura del Proyecto

- `app.js`: Punto de entrada que instancia la clase Server.
- `models/server.js`: Clase principal que configura Express, middlewares y rutas.
- `routes/`: Definición de las rutas de la API.
- `controllers/`: Lógica de negocio (funciones) que responden a las rutas.
- `public/`: Archivos estáticos servidos automáticamente.

## Licencia

Este proyecto está bajo la licencia ISC.
