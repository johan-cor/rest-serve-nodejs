# REST Server (NodeJS + MongoDB)

Este proyecto es un **REST Server** robusto construido con Node.js, Express y MongoDB (usando Mongoose). Implementa una arquitectura profesional basada en capas (Modelos, Rutas, Controladores) y cuenta con validaciones avanzadas, autenticación y manejo de base de datos.

## Características

- **Arquitectura MVC**: Separación clara de responsabilidades.
- **Base de Datos**: Integración con MongoDB mediante Mongoose.
- **CRUD Completo**: API RESTful para gestión de usuarios.
- **Validaciones**: Uso de `express-validator` y validaciones personalizadas contra DB (helpers).
- **Soft Delete**: Eliminación lógica de registros (cambio de estado) para mantener integridad referencial.
- **Paginación**: Endpoint GET optimizado con `Promise.all` para devolver total de registros y resultados paginados.
- **Seguridad**: Hashing de contraseñas con `bcryptjs`.
- **Configuración**: Variables de entorno con `dotenv`.
- **CORS**: Configurado para acceso cruzado.

## Instalación

1. Clona el repositorio.
2. Navega a la carpeta del proyecto.
3. Instala las dependencias:

```bash
npm install
```

## Configuración y Base de Datos

1. **MongoDB**: Necesitas tener una instancia de MongoDB corriendo (local o Atlas).
2. **Variables de Entorno**: Renombra (o crea) el archivo `.env` basado en el siguiente ejemplo:

```env
PORT=8080
MONGODB_CNN=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/cafe_db
```

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

La ruta base es `/api/usuarios`.

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| **GET** | `/api/usuarios` | Obtener lista de usuarios paginada. Filtra solo activos (`estado: true`). <br>Params opcionales: `?limite=5&desde=0` |
| **POST** | `/api/usuarios` | Crear usuario. Valida email único y rol existente en DB. |
| **PUT** | `/api/usuarios/:id` | Actualizar usuario por ID. Excluye campos sensibles como password o google flag. |
| **DELETE** | `/api/usuarios/:id` | **Eliminación lógica**. Marca el usuario como inactivo (`estado: false`) en lugar de borrarlo físicamente. |
| **PATCH** | `/api/usuarios` | Endpoint de ejemplo para actualizaciones parciales. |

## Estructura del Proyecto

- `app.js`: Punto de entrada.
- `models/server.js`: Configuración del servidor Express y conecciones.
- `DB/`: Configuración de la conexión a MongoDB.
- `models/`: Esquemas de Mongoose (Usuario, Role, etc.).
- `routes/`: Definición de endpoints.
- `controllers/`: Lógica de los endpoints.
- `middleware/`: Middlewares personalizados (validación de campos, etc.).
- `helpers/`: Validadores de base de datos y utilidades.
- `public/`: Archivos estáticos.

## Tecnologías

- Node.js
- Express
- MongoDB / Mongoose
- Bcryptjs
- Express Validator
- Dotenv
- Cors

## Licencia

Este proyecto está bajo la licencia ISC.
