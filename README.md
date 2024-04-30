# Node.js MySQL MVC Application

This application demonstrates a simple Node.js server using Express, Sequelize ORM for MySQL, and JWT for authentication. It includes models for Users and Patients, with associations between them, and controllers for handling HTTP requests related to users, patients, and admin functionalities.

## Prerequisites

- Node.js (v14.x or higher)
- MySQL Server (v5.7 or higher)

## Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running npm install.
4. Create a .env file in the root directory of the project and add the following environment variables:

``PORT=5000``
``MYSQL_DB=your_db_name``
``MYSQL_PASSWORD=your_db_root_password``
``MYSQL_USER=root``
``MYSQL_HOST=localhost``
``MYSQL_DIALECT=mysql``
``JWT_SECRET=your_jwt_secret``


5. Ensure your MySQL server is running and accessible with the credentials provided in the .env file.
6. Run npm start to start the server.

## Endpoints

### User Routes

- *POST /users/signup*: Register a new user.
- *POST /users/login*: Authenticate a user and return a JWT token.
- *GET /users/agents*: List all agents (requires admin role).
- *GET /users/patients*: List all patients (requires admin role).
- *DELETE /users/delete/:id*: Delete a user by ID (requires admin role).

### Patient Routes

- *POST /patients/detailedreport*: Create a new patient report (requires patient role).
- *GET /patients/patientdetails/:id*: Get patient details by ID (requires patient, agent, or admin role).

### Admin Routes

- *PUT /admin/patients/:id/approve-and-assign*: Approve a patient and assign an agent (requires admin role).

## Testing

To test the endpoints, you can use tools like Postman or Insomnia. Ensure you include the JWT token in the Authorization header for routes that require authentication.
