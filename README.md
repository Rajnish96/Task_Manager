# 📝 Node.js Task Manager App - Backend API

This is the backend API for a Task Manager application built with **Node.js**, **Express**, and **MySQL** using **Knex.js** as a query builder. It supports user authentication, task CRUD operations, email notifications, and scheduled tasks.

---

## 🚀 Features

- User authentication using JWT and bcrypt
- Input validation using express-validator
- Task scheduling with node-cron
- Email notifications with Nodemailer
- CORS support for frontend communication
- Environment configuration using dotenv

---

## 📦 Dependencies

| Package | Description |
|--------|-------------|
| **bcryptjs** | Used for hashing passwords securely before storing in the database. |
| **cors** | Enables Cross-Origin Resource Sharing (CORS) to allow requests from different domains (e.g., your frontend). |
| **dotenv** | Loads environment variables from a `.env` file into `process.env`. |
| **express** | Fast, minimalist web framework for Node.js to handle routing and middleware. |
| **express-validator** | Middleware for validating and sanitizing request data. |
| **jsonwebtoken** | Creates and verifies JSON Web Tokens (JWT) for user authentication. |
| **knex** | SQL query builder for MySQL (or other databases), makes working with DBs easier. |
| **mysql** | MySQL driver for Node.js to connect and interact with MySQL databases. |
| **node-cron** | Used to schedule tasks (like cleaning up completed tasks or sending reminder emails). |
| **nodemailer** | Sends emails (e.g., registration confirmation, task reminders). |

---

## 🛠️ Installation

# Clone the repository
git clone https://github.com/your-username/Task_Manager.git
cd Task_Manager

# Install dependencies
npm install

# Create a .env file and open it in a text editor
touch .env && echo "PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
EMAIL_USER=youremail@example.com
EMAIL_PASS=your_email_password" > .env

# Start the server
npm start


# 🔐 Register a new user
curl -X POST http://localhost:5000/v1/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","password":"yourpassword"}'

# 🔐 Login to get token
curl -X POST http://localhost:5000/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"yourpassword"}'

# Save your JWT token (manually copy from login response)
# Replace YOUR_TOKEN_HERE below with your actual JWT token

# ➕ Create a new task
curl -X POST http://localhost:5000/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"New Task","description":"This is a task","dueDate":"2025-04-15"}'

# 📥 Get all tasks (with pagination & optional status filter)
curl -X GET "http://localhost:5000/v1/tasks?page=1&limit=5&status=pending" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# 📄 Get single task by ID
curl -X GET http://localhost:5000/v1/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# ✏️ Update a task by ID
curl -X PUT http://localhost:5000/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Updated Task","status":"in-progress"}'

# ❌ Delete a task by ID
curl -X DELETE http://localhost:5000/v1/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
