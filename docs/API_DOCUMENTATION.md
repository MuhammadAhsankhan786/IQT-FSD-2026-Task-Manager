# IQT-FSD-2026 API Endpoint Documentation

All REST APIs communicate over JSON. The default base URL is: `http://localhost:5000/api/tasks`

---

## Task Endpoints

### 1. GET `/api/tasks`
Fetches all tasks in descending order of creation (most recent first).

- **Method**: `GET`
- **Headers**: `Content-Type: application/json`
- **Request Body**: *None*
- **Response**:
  - **Status Code**: `200 OK`
  - **Body (Array of Tasks)**:
    ```json
    [
      {
        "_id": "6670868f7129ee7ebcbaf410",
        "title": "Build UI Dashboard Components",
        "completed": false,
        "createdAt": "2026-06-17T03:52:15.120Z",
        "updatedAt": "2026-06-17T03:52:15.120Z",
        "__v": 0
      }
    ]
    ```

---

### 2. POST `/api/tasks`
Creates a new task.

- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "title": "Complete assessment report"
  }
  ```
- **Validations**:
  - `title` is required.
  - `title` must be a non-empty string.
- **Response**:
  - **Status Code**: `201 Created`
  - **Body (Created Task Document)**:
    ```json
    {
      "title": "Complete assessment report",
      "completed": false,
      "_id": "6670870c7129ee7ebcbaf414",
      "createdAt": "2026-06-17T03:54:20.312Z",
      "updatedAt": "2026-06-17T03:54:20.312Z",
      "__v": 0
    }
    ```
  - **Error Codes**:
    - `400 Bad Request` if `title` is missing or blank.

---

### 3. PUT `/api/tasks/:id`
Updates fields on a task (by ID). Used for toggling completion or editing task title.

- **Method**: `PUT`
- **Path Parameters**:
  - `id`: MongoDB Task ID (valid ObjectId hex string).
- **Headers**: `Content-Type: application/json`
- **Request Body (Partial Update)**:
  ```json
  {
    "title": "Modified task title",
    "completed": true
  }
  ```
- **Validations**:
  - `id` must be a valid 24-character hexadecimal ObjectId.
  - If `title` is supplied, it must be a non-empty string.
  - If `completed` is supplied, it must be a boolean.
- **Response**:
  - **Status Code**: `200 OK`
  - **Body (Updated Task Document)**:
    ```json
    {
      "_id": "6670870c7129ee7ebcbaf414",
      "title": "Modified task title",
      "completed": true,
      "createdAt": "2026-06-17T03:54:20.312Z",
      "updatedAt": "2026-06-17T03:56:01.810Z",
      "__v": 0
    }
    ```
  - **Error Codes**:
    - `400 Bad Request` if parameter ID or body values are invalid.
    - `404 Not Found` if task ID does not exist.

---

### 4. DELETE `/api/tasks/:id`
Deletes a task by ID.

- **Method**: `DELETE`
- **Path Parameters**:
  - `id`: MongoDB Task ID (valid ObjectId hex string).
- **Headers**: `Content-Type: application/json`
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "success": true,
      "message": "Task successfully deleted",
      "task": {
        "_id": "6670870c7129ee7ebcbaf414",
        "title": "Modified task title",
        "completed": true
      }
    }
    ```
  - **Error Codes**:
    - `400 Bad Request` if ID format is invalid.
    - `404 Not Found` if task ID does not exist.
