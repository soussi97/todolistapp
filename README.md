ToDoList App

  _____         _       _     _ _     
 |_   _|____  _| |_ ___| |__ (_) |_ ___
   | |/ _ \ \/ / __/ __| '_ \| | __/ __|
   | |  __/>  <| || (__| | | | | |_\__ \
   |_|\___/_/\_\\__\___|_| |_|_|\__|___/

A beautifully designed ToDoList app to keep you organized and productive, built with Next.js and Node.js (Express). This project includes a fully functioning task management system with user authentication, CRUD operations, calendar integration, and a visually appealing UI.

Table of Contents

Features

Technologies Used

Getting Started

Demo User Login

File Structure

API Documentation

Contributing

License

Features

+---------------------------------------------------------+
|       Features Overview                                 |
+---------------------------------------------------------+
| 1. User Authentication (Sign Up / Login / Logout)       |
| 2. Task Management (Add, Edit, Delete, Complete Tasks)  |
| 3. Calendar Integration to Track Task Deadlines         |
| 4. Typing Animation to Greet the User                   |
| 5. Dashboard with Task Statistics                       |
| 6. User Profile Management                              |
+---------------------------------------------------------+

Technologies Used

Frontend

+----------------------------+
|  Next.js (React Framework) |
|  Typewriter-effect         |
|  Bootstrap (UI)            |
|  Axios (API Calls)         |
+----------------------------+

Backend

+----------------------------+
|  Node.js                   |
|  Express.js                |
|  MongoDB                   |
|  Mongoose (ODM)            |
|  bcryptjs (Password Hash)  |
|  JWT (Authentication)      |
+----------------------------+

Getting Started

To get a local copy up and running, follow these simple steps:

Clone the repository

git clone <repository-url>

Navigate to Backend Directory and Install Dependencies

cd todolistapp/backend
npm install

Navigate to Frontend Directory and Install Dependencies

cd ../app
npm install

Set Up Environment Variables
Create a .env file inside backend directory with the following:

MONGO_URI=mongodb://localhost:27017/todolist
PORT=5000
JWT_SECRET=YOUR_SECRET_KEY_HERE

Run Backend Server

cd backend
npm start

Run Frontend Server

cd ../app
npm run dev

Open Your Browser
Navigate to http://localhost:3000

Demo User Login

Use the demo admin credentials to explore the features:

+-----------------------------+
| Email: admin@example.com    |
| Password: password123       |
+-----------------------------+

File Structure

+-- todolistapp
|   +-- app
|   |   +-- components
|   |   |   +-- addTaskForm.js
|   |   |   +-- CalendarComponent.js
|   |   |   +-- EditTaskForm.js
|   |   |   +-- Footer.js
|   |   |   +-- Header.js
|   |   |   +-- LoginForm.js
|   |   |   +-- Profile.js
|   |   |   +-- signUpForm.js
|   |   |   +-- StatsComponent.js
|   |   |   +-- TaskCard.js
|   |   |   +-- TaskControls.js
|   |   |   +-- TaskForm.js
|   |   +-- globals.css
|   |   +-- layout.js
|   |   +-- page.js
|   +-- backend
|   |   +-- config
|   |   |   +-- db.js
|   |   +-- controllers
|   |   |   +-- taskController.js
|   |   +-- models
|   |   |   +-- Task.js
|   |   |   +-- User.js
|   |   +-- routes
|   |   |   +-- authRoutes.js
|   |   |   +-- taskRoutes.js
|   |   +-- demo-data.js
|   |   +-- insertDemoAdmin.js
|   |   +-- server.js
|   +-- .env
|   +-- README.md

API Documentation

Authentication Routes

POST /api/auth/signup - Register a new user.

POST /api/auth/login - Log in an existing user.

GET /api/auth/profile - Retrieve the authenticated user's profile (JWT required).

Task Management Routes

GET /api/tasks - Get all tasks of the authenticated user.

POST /api/tasks - Create a new task.

PUT /api/tasks/:id - Update a specific task by ID.

DELETE /api/tasks/:id - Delete a specific task by ID.

Example Request Using Postman

POST /api/auth/login
Body: {
  "email": "admin@example.com",
  "password": "password123"
}

Contributing

Contributions are what make the open source community such an amazing place to be. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

License

Distributed under the MIT License. See LICENSE for more information.

+---------------------------------------------------+
|          ____  _      _   _ _                     |
|         / ___|| |_ __| |_(_) |_ _   _ _ __        |
|         \___ \| __/ _` | __| | __| | | | '_ \     |
|          ___) | || (_| | |_| | |_| |_| | |_) |    |
|         |____/ \__\__,_|\__|_|\__|\__,_| .__/     |
|                                        |_|       |
+---------------------------------------------------+

Happy Coding! 🚀
