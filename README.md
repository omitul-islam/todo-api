# To-Do List API with Authentication, File Uploads, Caching, and Background Jobs

A full-featured Node.js application for managing to-do tasks with advanced capabilities including JWT-based authentication, role-based access control, file uploads, Redis caching, and background job processing with Bull.

## 🚀 Features

- User registration and login using JWT
- Password encryption using bcrypt
- Role-based access control (admin/user)
- File uploads with Multer (attachments for tasks)
- Redis caching for performance
- Bull queue for background job processing (reminders, auto-archiving)
- MongoDB (with Mongoose) for data persistence
- Zod for API data validation
- Nodemailer integration for email reminders

## 📁 Project Structure
 src/
│
├── auth/                # Authentication logic (JWT, bcrypt)
│   ├── auth.controller.js
│   ├── auth.route.js
│   ├── auth.model.js
│   ├── auth.service.js      # Authentication service
│   └── auth.validate.js     # Authentication validation
│
├── todo/                # To-do task functionality
│   ├── controller/
│   │   └── todoController.js
│   ├── model/
│   │   └── todoModel.js
│   ├── route/
│   │   └── todo.route.js
│   ├── service/
│   │   └── todo.service.js
│   ├── multer/
│   │   └── multer.js
│   ├── redis/
│   │   └── redis.js
│
├── localTodosStorage.js   # Local todos storage
│
├── user/                # User profile CRUD
│   ├── user.controller.js
│   ├── user.route.js
│   └── user.service.js
│
├── admin/               # Admin functionality
│   ├── admin.controller.js
│   ├── admin.route.js
│   └── admin.service.js
│
├── middleware/         # Custom error handling middleware
│   └── customErrorHandler.js  
│
├── utils/               # Utility functions
│   ├── archiveSchedule.js
│   ├── isAdmin.js
│   ├── jwtUtils.js
│   ├── reminder.js
│
├── uploads/             # File uploads
│   └── (Your file storage here)
│
├── validation/          # Zod schemas for request validation
│   └── todoValidation.js
│
├── db/                  # Database connection
│   └── db.js
│
├── app.js               # Application setup and configuration
├── server.js            # Entry point of the application
└── logs.txt             # Logs file

---

## 📦 Dependencies

- **Backend Framework**: `express`
- **Environment Management**: `dotenv`
- **Authentication & Security**: `jsonwebtoken`, `bcrypt`
- **Database**: `mongoose`
- **Validation**: `zod`
- **File Upload**: `multer`
- **Emailing**: `nodemailer`
- **Job Queueing**: `bull`, `ioredis`
- **Caching**: `redis`
- **Email send**: `Nodemailer`

---

## 📄 API Endpoints

### 🔐 Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in and receive JWT

### ✅ Todo Routes (User)
- `GET /api/todos` - Get all tasks for the logged-in user
- `POST /api/todos` - Add a new task (with optional attachment)
- `PUT /api/todos/:id` - Update task by ID (supports file upload)
- `DELETE /api/todos/:id` - Delete task by ID

### 🛠️ Admin Routes
- `GET /api/admin/todos` - Get all tasks (admin only)
- `GET /api/admin/todos/:id` - Get all tasks by a specific user ID
- `DELETE /api/admin/todos/:id` - Delete task by ID
- `PUT /api/admin/todos/:id` - Update task by ID (supports file upload)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user by ID
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id` - Update user

### 👤 Profile Routes (User)
- `GET /api/user/profile` - Get current user's profile
- `PUT /api/user/profile` - Update current user's profile
- `DELETE /api/user/profile` - Delete current user's account

---

## 🧠 Core Concepts Demonstrated

- Uses `fs` module to log requests
- Async/await for all database and I/O operations
- Error handling with custom middleware
- Middleware to parse JSON, handle authentication
- Role-based guards using custom middleware
- JWT Authentication
- Password hashing and encryption with `bcrypt`
- Custom validation schema using `zod`
- Background job processing with Bull
- Redis caching for frequently accessed data
- File uploads with Multer
- User registration and login flow
- Email notification using nodemailer
- Database interactions with MongoDB and Mongoose

---
## ⚙️ Environment Variables (`.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todo-app?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
TASKMAILER=your_email@gmail.com
TASKMAILER_PASSWORD=your_email_password
ARCHIVE_DELAY=3600000 // what delay you need actually
REDIS_CACHE_KEY=todo-cache
```
---
## 📬 Email Reminders (Bull + Nodemailer)

- If a task is not marked completed before a certain time, the user gets a reminder email.
- Configured using `reminderQueue` with Bull, used nodemailer to actually send the email.

---
## 🗃️ Archiving Tasks Automatically

- Completed tasks that are not archived get queued in `archiveQueue`.
- After a configurable delay, they are archived automatically.

---
## 🧪 Validation

- Input data validated with `zod` schemas in `validation/validation.js`
- Example schema:

```js
const taskUpdateSchema = z.object({
  task: z.string().min(10).optional(),
  isCompleted: z.boolean().optional()
});

---

## 🛠️ Scripts

- `npm run dev` — Start server in development mode
- `npm start` — Start server normally

---
## 💬 Notes

- Ensure Redis is running on the configured host/port.
- Use `Postman` or similar to test protected endpoints with JWTs.
- Uploaded files are accessible via the path returned in the response.

---

## 📚 License
MIT – Free to use and modify.

---
## 🧑‍💻 Author

Crafted with ❤️ for learning and production-ready applications.
