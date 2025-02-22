# Backend Setup for InclusiFind

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [File Descriptions](#file-descriptions)
- [Running the Server](#running-the-server)
- [Testing Database Connection](#testing-database-connection)
- [Environment Variables](#environment-variables)

## Introduction
This backend powers the InclusiFind application, handling API requests, database connections, and business logic. It is built with **Node.js, Express, and MySQL**.

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MySQL](https://www.mysql.com/)
- Git (optional, for version control)

## Installation
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd backend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the `backend` folder.
   - Add the following variables:
     ```ini

     ```

## Project Structure
```
backend/
│── server.js         # Main entry point
│── db_connect.js     # MySQL database connection setup
│── test_db.js        # Script to test database connectivity
│── routes/          # API route handlers
│── controllers/     # Business logic handlers
│── models/          # Database models
│── .env             # Environment variables
│── package.json     # Dependencies and scripts
│── README.md        # Documentation
```

## File Descriptions

### `server.js`
- Initializes the Express server
- Configures middleware (CORS, JSON parsing, etc.)
- Defines API endpoints
- Starts the server on a specified port (5173)

### `db_connect.js`
- Establishes a MySQL connection using a Promise-based pool
- Exports the connection for use in other files

### `test_db.js`
- Tests the database connection by running a simple query
- Logs success or error messages

## Running the Server
To start the backend server:
```sh
cd backend
node server.js
```
Or using Nodemon for automatic restarts:
```sh
npx nodemon server.js
```

## Testing Database Connection
Run the test script to check database connectivity:
```sh
node test_db.js
```
If successful, it will log a connection confirmation message.

## Environment Variables
Make sure the `.env` file is correctly configured with your database credentials to avoid connection errors.

---
For any issues, check logs or open an issue on the repository.

