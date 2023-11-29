# Test-task Express, Sequelize, Postrgesql

**Test-task Express, Sequelize, Postrgesql** is a Node.js project that implements simple web-app. It uses the following technologies:

- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Sequelize**: A promise-based ORM for Node.js that supports PostgreSQL, MySQL, SQLite, and more.
- **Dotenv**: A zero-dependency module that loads environment variables from a `.env` file.
- **Jest**: A JavaScript testing framework with a focus on simplicity.
- **ESLint**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

## Task

### Task 1: Create a Simple WebApp

Create a simple web application using Node.js (Express, JavaScript), PostgresQL (Sequelize ORM).

Upon startup, the application should create a "users" table in the database using migration and add one user account to it with only one field "balance" set to 10000. You can use the "Umzug" library for managing migrations.

Write a route to update the user's balance, both increasing and decreasing it, accepting the parameters userId and amount.

An important condition is that the user's balance cannot be negative.

The balance change should happen in real-time, without using queues or delayed tasks.

This task will be tested by sending 10000 requests at once to attempt to withdraw 2 units from the user's balance. 5000 requests should be processed successfully, while the second half should receive an appropriate error indicating insufficient funds.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone git@github.com:verbindima/test-task-sequilize-express.git`
2. Install the dependencies: `npm install`
3. Fill it out .env according to .env.example
4. Start the development server: `npm start`

## Scripts

The project includes the following scripts:`:

- `start`: Starts the development server.
- `test`: Runs the tests.
- `dev:start`: Starts the development server with nodemon.
- `dev:test`: Runs the tests in the development environment.
- `dev:lint`: Runs ESLint to check for linting errors.
- `docker:up`: Starts the Docker containers.
- `docker:down`: Stops the Docker containers.
- `migration:create`: Creates a new migration file.

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).