# Todo API

A simple Node.js application that provides a RESTful API for managing a to-do list. The project combines core Node.js concepts with Express.js, API development best practices, and integrates error handling, validation, and logging.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
3. [API Documentation](#api-documentation)
   - [GET /todos](#get-todos)
   - [POST /todos](#post-todos)
   - [PUT /todos/:id](#put-todosid)
   - [DELETE /todos/:id](#delete-todosid)
4. [Core Concepts](#core-concepts)
5. [Bonus Features](#bonus-features)

---

## Project Overview

This project serves as a simple to-do list application that:
- Allows users to perform CRUD operations on tasks.
- Logs API requests to a file.
- Uses input validation to ensure that the task data is valid.
- Implements a custom error-handling middleware for graceful error management.

The project is built with Node.js, Express.js, and stores data in-memory.

---

## Setup Instructions

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- A code editor (e.g., VSCode).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-api.git
   cd todo-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and specify the port number for your server:

   ```bash
   PORT=5000
   ```

4. Start the server in development mode:

   ```bash
   npm run dev
   ```

   The server will be running on the port defined in `.env` (default is `5000`).

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### 1. **GET /todos**

- **Description**: Fetch all tasks in the to-do list.
- **Response**: Returns a list of tasks in JSON format.

#### Example:

```http
GET /api/todos
```

Response:

```json
{
  "message": "All the todos are fetched successfully!",
  "Tasks": [
    {
      "id": 1,
      "task": "Learn Node.js",
      "isCompleted": false
    },
    {
      "id": 2,
      "task": "Build a to-do app",
      "isCompleted": false
    }
  ]
}
```

---

### 2. **POST /todos**

- **Description**: Create a new task. The `task` field must be a string with a minimum length of 10 characters.
- **Request Body**: JSON with a `task` field.

#### Example:

```http
POST /api/todos
```

Request Body:

```json
{
  "task": "Learn Express.js"
}
```

Response:

```json
{
  "message": "Task created successfully!",
  "task": {
    "id": 3,
    "task": "Learn Express.js",
    "isCompleted": false
  }
}
```

---

### 3. **PUT /todos/:id**

- **Description**: Update a task by its ID. You can update the task name and its completion status.
- **Request Body**: JSON with `task` and/or `isCompleted` fields.
- **Parameters**: `id` (task ID).

#### Example:

```http
PUT /api/todos/1
```

Request Body:

```json
{
  "task": "Learn Node.js in depth",
  "isCompleted": true
}
```

Response:

```json
{
  "message": "Todo is updated!",
  "updatedTask": {
    "id": 1,
    "task": "Learn Node.js in depth",
    "isCompleted": true
  }
}
```

---

### 4. **DELETE /todos/:id**

- **Description**: Delete a task by its ID.
- **Parameters**: `id` (task ID).

#### Example:

```http
DELETE /api/todos/1
```

Response:

```json
{
  "message": "This task is deleted!",
  "deletedTask": {
    "id": 1,
    "task": "Learn Node.js",
    "isCompleted": false
  }
}
```

---

## Core Concepts

1. **Logging API requests**: We use the `fs` module to log all incoming API requests to a file (`logs.txt`). This helps keep track of the requests made to the server.
2. **Promise & Async/Await & callback**: The `POST` route handle promises and async operations and callbacks, including task creation.
3. **Error Handling Middleware**: A global error handler is used to catch errors thrown during API calls and respond with meaningful error messages.

---

## Bonus Features

1. **Input Validation**: Task creation and updating are validated using the `Zod` library. It ensures that task names are strings with a minimum length of 10 characters and also it ensures that isCompleted takes a boolean value.
2. **Custom Error Handling**: If any route encounters an error, it is passed to the custom error handler, which sends back appropriate error messages.

---

## License

MIT License
