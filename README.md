# API de Autenticación con NestJS

Este proyecto es una API de autenticación creada con **NestJS**. Permite a los usuarios registrarse, iniciar sesión y cerrar sesión. Además, cuenta con una documentación integrada en **Swagger** para facilitar el uso y exploración de la API.

## Características

- **Registro de usuarios:** permite a los nuevos usuarios registrarse de forma segura.
- **Inicio de sesión:** los usuarios registrados pueden iniciar sesión y recibir un token de acceso JWT.
- **Cierre de sesión:** permite invalidar el token de acceso.
- **Swagger:** documentación en vivo de los endpoints de la API.

## Tecnologías

- **NestJS**: framework para construir aplicaciones escalables de backend en Node.js.
- **JWT**: autenticación basada en tokens para proteger los endpoints.
- **bcrypt**: hashing de contraseñas para almacenar credenciales de manera segura.
- **Swagger**: documentación automática y exploración de la API.
- **TypeORM o Prisma**: ORM para la gestión de la base de datos (elegir según preferencia).
- **Passport.js**: integración de estrategias de autenticación.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd nombre-del-proyecto```

2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Crea un archivo `.env` con las variables de entorno necesarias, como la clave secreta de JWT y los detalles de la base de datos. Ejemplo:
    ```
      DB_TYPE=postgres
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=pg_username
      DB_PASSWORD=pg_password
      DB_DATABASE=pg_database_name
      DB_SYNCHRONIZE=false
      JWT_SECRET=your_secret_ket
      JWT_EXPIRES_IN=1h
    ```

4. Ejecuta la aplicación:
    ```bash
      npm run start
    ```
    La api estará disponible en `http://localhost:3000`.
5. Accede a la documentación de Swagger en `http://localhost:3000/api.`

## Endpoints Principales

### Registro de Usuarios

* Ruta: `POST /auth/register`
* Descripción: Registra un nuevo usuario.
* Body: 
    ```json
        {
          "email": "user@example.com",
          "password": "password123",
          "name": "John Doe"
        }
    ```
* Respuesta: 
  * `201 Created`: usuario registrado correctamente.

### Inicio de Sesión

* Ruta: `POST /auth/login`
* Descripción: Permite a un usuario registrado iniciar sesión.
* Body: 
    ```json
        {
          "email": "user@example.com",
          "password": "password123"
        }
    ```
* Respuesta: 
  * `200 OK`: devuelve un token de acceso JWT.