# API de Autenticación con NestJS

Este proyecto es una API creada con **NestJS** que permite la autenticación de usuarios, gestión de tareas, y un sistema de seguimiento de tiempo para tareas. Los usuarios pueden registrarse, iniciar sesión y administrar sus tareas (listar, crear, actualizar, eliminar y completar). Además, cuenta con un sistema de **Time Tracking** para iniciar y detener sesiones de trabajo. La documentación de **Swagger** facilita el uso y exploración de la API.

## Características

### Autenticación
- **Registro de usuarios:** permite a los nuevos usuarios registrarse de forma segura.
- **Inicio de sesión:** los usuarios registrados pueden iniciar sesión y recibir un token de acceso JWT.
- **Cierre de sesión:** permite invalidar el token de acceso.

### Gestión de Tareas
- **Listar tareas:** permite a los usuarios listar todas sus tareas.
- **Crear tarea:** permite a los usuarios crear nuevas tareas.
- **Actualizar tarea:** permite a los usuarios actualizar detalles de una tarea existente.
- **Eliminar tarea:** permite a los usuarios eliminar una tarea.
- **Completar tarea:** permite a los usuarios marcar una tarea como completada.

### Time Tracking (Seguimiento de Tiempo)
- **Iniciar seguimiento:** permite a los usuarios iniciar una sesión de tiempo para una tarea específica.
- **Detener seguimiento:** permite a los usuarios detener la sesión de tiempo en curso para una tarea.
- **Obtener sesiones:** permite a los usuarios obtener una lista de todas sus sesiones de trabajo, con detalles sobre el tiempo dedicado a cada tarea.

## Tecnologías

- **NestJS**: framework para construir aplicaciones escalables de backend en Node.js.
- **JWT**: autenticación basada en tokens para proteger los endpoints.
- **bcrypt**: hashing de contraseñas para almacenar credenciales de manera segura.
- **Swagger**: documentación automática y exploración de la API.
- **TypeORM**: ORM para la gestión de la base de datos.
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

### Tareas

#### Listar tareas

* Ruta: `GET /tasks`
* Descripción: Listar todas las tareas del usuario autenticado.
* Respuesta: 
  * `200 OK`: devuelve una lista de tareas.

#### Crear tareas

* Ruta: `POST /tasks`
* Descripción: Crea una nueva tarea para el usuario autenticado.
* Body: 
    ```json
        {
          "title": "Nueva tarea",
          "description": "Descripción de la tarea"
        }
    ```
* Respuesta: 
  * `201 Created`: tarea creada correctamente.

#### Actualizar tareas

* Ruta: `PUT /tasks/:id`
* Descripción: Actualiza una tarea existente.
* Body: 
    ```json
        {
          "title": "Título actualizado",
          "description": "Descripción actualizada"
        }
    ```
* Respuesta: 
  * `200 OK`: tarea actualizada correctamente.

#### Eliminar tarea

* Ruta: `DELETE /tasks/:id`
* Descripción: Elimina una tarea existente.
* Respuesta: 
  * `204 No Content`: tarea eliminada correctamente.

#### Completar tarea

* Ruta: `POST /tasks/:id/complete`
* Descripción: Marca una tarea como completada.
* Respuesta: 
  * `200 OK`: tarea marcada como completada.

### Time Tracking (Seguimiento de Tiempo)

#### Iniciar Seguimiento de Tiempo
* Ruta: `POST /time-tracking/start`
* Descripción: Inicia una sesión de tiempo para una tarea específica.
* Body:
      ```json
      {
        "taskId": "a12f3e4d-5678-49bc-a5a6-e2f9d5bf4c3d"
      }
      ```
* Respuesta:
  * `201 Created`: sesión de tiempo iniciada correctamente.
  * Ejemplo de respuesta:
      ```json
      {
        "sessionId": "b34c5d6e-7890-41de-b7c6-f4f9e8ad7d1e",
        "taskId": "a12f3e4d-5678-49bc-a5a6-e2f9d5bf4c3d",
        "startTime": "2023-11-03T15:00:00.000Z"
      }
      ```

#### Detener Seguimiento de Tiempo
* Ruta: `POST /time-tracking/stop`
* Descripción: Detiene una sesión de tiempo en curso.
* Body:
      ```json
      {
        "sessionId": "b34c5d6e-7890-41de-b7c6-f4f9e8ad7d1e"
      }
      ```
* Respuesta:
  * `200 OK`: sesión de tiempo detenida correctamente.
  * Ejemplo de respuesta:
      ```json
      {
        "sessionId": "b34c5d6e-7890-41de-b7c6-f4f9e8ad7d1e",
        "taskId": "a12f3e4d-5678-49bc-a5a6-e2f9d5bf4c3d",
        "startTime": "2023-11-03T15:00:00.000Z",
        "endTime": "2023-11-03T16:00:00.000Z",
        "duration": "1 hour"
      }
      ```
#### Detener Seguimiento de Tiempo
* Ruta: `POST /time-tracking`
* Descripción: Obtiene todas las sesiones de tiempo del usuario autenticado.
* Respuesta:
  * `200 OK`: devuelve una lista de sesiones de trabajo.
  * Ejemplo de respuesta:
      ```json
      [
        {
          "sessionId": "b34c5d6e-7890-41de-b7c6-f4f9e8ad7d1e",
          "taskId": "a12f3e4d-5678-49bc-a5a6-e2f9d5bf4c3d",
          "startTime": "2023-11-03T15:00:00.000Z",
          "endTime": "2023-11-03T16:00:00.000Z",
          "duration": "1 hour"
        }
      ]
      ```

### Estadísticas de Productividad

#### Obtener Estadísticas Diarias

* Ruta: `GET /statistics/daily`
* Descripción: Obtiene estadísticas de productividad para el día actual.
* Respuesta:
  * `200 OK`: devuelve el total de horas trabajadas y el número de sesiones.
  * Ejemplo de respuesta:
    ```json
    {
      "date": "2023-11-03",
      "totalHours": 5,
      "sessionsCount": 3
    }
    ```

#### Obtener Estadísticas Semanales

* Ruta: `GET /statistics/weekly`
* Descripción: Obtiene estadísticas de productividad para la semana actual.
* Respuesta:
  * `200 OK`: devuelve el total de horas trabajadas y el número de sesiones.
  * Ejemplo de respuesta:
    ```json
    {
      "week": "2023-10-30 - 2023-11-05",
      "totalHours": 20,
      "sessionsCount": 10
    }
    ```

### Recomendaciones

#### Obtener Recomendaciones Personalizadas

* Ruta: `GET /recommendations`
* Descripción: Devuelve recomendaciones personalizadas basadas en los hábitos del usuario.
* Respuesta:
  * `200 OK`: devuelve una lista de recomendaciones.
  * Ejemplo de respuesta:
    ```json
    [
      "Comienza una nueva sesión de trabajo para mantener tu productividad.",
      "Intenta dedicar al menos 1 hora diaria para alcanzar tus metas.",
      "Tienes 3 tareas pendientes. Prioriza las más importantes."
    ]
    ```

### Gamificación

#### Ver Puntos del Usuario

* Ruta: `GET /gamification/points`
* Descripción: Devuelve el total de puntos acumulados por el usuario.
* Respuesta:
  * `200 OK`: devuelve el total de puntos.
  * Ejemplo de respuesta:
    ```json
    { "points": 75 }
    ```

#### Ver Medallas del Usuario

* Ruta: `GET /gamification/badges`
* Descripción: Devuelve las medallas o logros obtenidos por el usuario.
* Respuesta:
  * `200 OK`: devuelve una lista de medallas.
  * Ejemplo de respuesta:
    ```json
    { "badges": ["Buen Comienzo", "Maestro del Tiempo"] }
    ```

### Sincronización con Google Calendar

#### Sincronizar con Google Calendar

* Ruta: `POST /calendar-sync/google-sync`
* Descripción: Sincroniza las tareas del usuario con Google Calendar.
* Body:
  ```json
  {
    "googleAccessToken": "ya29.a0Ae6..."
  }
* Respuesta:
  * `200 OK`: Sincronización exitosa con Google Calendar.
  * Ejemplo de respuesta:
    ```json
    { "message": "Sincronización exitosa con Google Calendar" }
    ```



