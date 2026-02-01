# REST Server (NodeJS + MongoDB)

Este proyecto es un **REST Server** robusto construido con Node.js, Express y MongoDB (usando Mongoose). Implementa una arquitectura profesional basada en capas (Modelos, Rutas, Controladores) y cuenta con **autenticación JWT** y autorización por Roles.

## Características

- **Arquitectura MVC**: Separación clara de responsabilidades.
- **Base de Datos**: Integración con MongoDB mediante Mongoose.
- **CRUD Completo**: API RESTful para gestión de usuarios.
- **Seguridad y Autenticación**:
  - Generación y validación de **JSON Web Tokens (JWT)**.
  - Login de usuarios (Google Auth y Nativo).
  - Hashing de contraseñas con `bcryptjs`.
- **RBAC (Role-Based Access Control)**: Middlewares para proteger rutas según el rol del usuario (`ADMIN_ROL`, `USER_ROL`, etc.).
- **Frontend de Prueba**: Página web moderna responsive (`public/index.html`) para probar el inicio de sesión con Google (Sign In / Sign Out).
- **Validaciones**: Uso de `express-validator` y validaciones personalizadas contra DB (helpers).
- **Soft Delete**: Eliminación lógica de registros (cambio de estado).
- **Configuración**: Variables de entorno con `dotenv`.

## Instalación

1. Clona el repositorio.
2. Navega a la carpeta del proyecto.
3. Instala las dependencias:

```bash
npm install
```

## Configuración y Base de Datos

1. **MongoDB**: Necesitas tener una instancia de MongoDB.
2. **Variables de Entorno**: Configura tu archivo `.env`:

```env
PORT=8080
MONGODB_CNN=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/cafe_db
SECRETORPRIVATEKEY=TuSecretKeySuperSeguraParaFirmarTokens
GOOGLE_CLIENT_ID=Tu_Google_Client_ID.apps.googleusercontent.com
GOOGLE_SECRET_ID=Tu_Google_Secret_ID
```

> **Nota:** Para que funcione Google Sign-In, debes configurar un proyecto en Google Cloud Console.

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

### Usuarios (`/api/usuarios`)

| Método | Endpoint | Descripción | Auth Requerido |
| ------ | -------- | ----------- | -------------- |
| **GET** | `/api/usuarios` | Obtener lista de usuarios paginada. | No |
| **POST** | `/api/usuarios` | Crear usuario (Registro). | No |
| **PUT** | `/api/usuarios/:id` | Actualizar usuario por ID. | No |
| **DELETE** | `/api/usuarios/:id` | Eliminación lógica usuario. | **Sí (Token + Rol)** |
| **PATCH** | `/api/usuarios` | Actualización parcial. | No |

### Autenticación (`/api/auth`)

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| **POST** | `/api/auth/login` | Login normal. Retorna el usuario y un JWT. |
| **POST** | `/api/auth/google` | Login con Google Identity Services. Verifica el token de Google y crea/login el usuario. |

## Frontend

Este backend sirve una aplicación web básica en la ruta raíz `/` para probar la autenticación con Google.

- Visita `http://localhost:8080/` para ver la pantalla de Login estilizada.

## Middlewares Personalizados

El proyecto utiliza middlewares modulares (ubicados en `middleware/`):

- `validar-campos`: Recolecta errores de `express-validator`.
- `validar-jwt`: Protege rutas verificando la firma del Token.
- `validar-roles`: Verifica si el usuario tiene permisos de Administrador o roles específicos.

## Estructura del Proyecto

- `models/`: Esquemas de Mongoose (Usuario, Role, Server).
- `routes/`: Rutas de Usuarios y Auth.
- `controllers/`: Lógica de negocio (Login nativo y Google).
- `middleware/`: Middlewares de validación y seguridad.
- `helpers/`: Validadores de base de datos y Google Verify.
- `public/`: Archivos estáticos y Frontend de ejemplo.

## Tecnologías

- Node.js & Express
- MongoDB & Mongoose
- JSON Web Token (jsonwebtoken)
- Bcryptjs
- Google Auth Library

## Licencia

Este proyecto está bajo la licencia ISC.
