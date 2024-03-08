               <!-- Evangadi Forem Backend -->
<!-- This project is a starter template for building a web application using Node.js, Express.js, MySQL, and JWT authentication. It provides basic functionalities such as user registration, login, and user authentication. -->

## Create Database Tables
Under your database, create 3 tables: `users`, `questions`, and `answers`. You can use the following SQL query code to create the tables:

```sql
CREATE TABLE users (
  userid INT(20) NOT NULL AUTO_INCREMENT,
  usersid INT(20) NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  firstname VARCHAR(20) NOT NULL,
  lastname VARCHAR(20) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY (userid)
  PRIMARY KEY (usersid)
);

CREATE TABLE questions (
  questionid INT(20) NOT NULL AUTO_INCREMENT,
  question VARCHAR(225) NOT NULL,
  questiondescription VARCHAR(225),
  questionCodeBlock VARCHAR(225),
  tags VARCHAR(200),
  usersid INT(20) NOT NULL,
  PRIMARY KEY (questionid),
  FOREIGN KEY (usersid) REFERENCES (usersid)
);


CREATE TABLE answerTable (
  answerid INT(20) NOT NULL AUTO_INCREMENT,
  answer VARCHAR(225) NOT NULL,
  answerCodeBlock VARCHAR(225),
  usersid INT(20) NOT NULL,
  questionid INT(20) NOT NULL,
  PRIMARY KEY (answerid),
  FOREIGN KEY (usersid) REFERENCES users(usersid),
  FOREIGN KEY (questionid) REFERENCES questions(questionid)
);


<!-- Database User Account: Create a user account in your database and give access privileges to manage and access the database.-->

                         <!-- Getting Started -->

<!-- to connect your database to your code=> create a starter folder and open it on code editor -->
  <!-- clone this repository from -->
    https://github.com/abyu301/evangadi-forem-backend.git
  <!-- change your directory to your new working directory and install dependant  node modules -->
    npm i --save


<!-- Configure Database Connection: Open dbConfige.js file and provide your database information to the dbConnection function. -->
  -- create .env file and put your secret information in dbConfige.js
  <!-- to conecte my database server and npm code i install and used mysql module -->
     <!-- "mysql2": "^3.9.1" -->
  <!-- to build API documentation for mysql i use express module -->
    "express": "^4.18.2",

<!-- Set up the environment variables:

Create a .env file in the root directory.

Add the following environment variables to the .env file -->
  JWT_SECRET=your_jwt_secret_key


<!-- Run Application: Start the application using either npm start or nodemon app.js. Access the application in your web browser at http://localhost:5500. -->
npm start or nodemon app.js

<!-- Project Structure
The project structure is organized as follows:

db: Contains database configuration files.
middleware: Contains authentication middleware.
routes: Contains route definitions for user and question endpoints.
controller: Contains controller functions for handling user and question operations. -->

<!-- Available Routes
/api/users/register: User registration endpoint.
/api/users/login: User login endpoint.
/api/users/check: Endpoint to check user authentication.
/api/questions: Endpoints for managing questions (authentication required). -->


<!-- if you want to sent POST request to mysql server, to design, test, and debug APIs. you can use postman or other API testing and automation tools. -->

<!-- Tools
MySQL: Database management system.
bcrypt: Password hashing library for securing user passwords.
jsonwebtoken: JSON Web Token library for user authentication. -->

<!-- Contributing
Contributions are welcome! Feel free to submit pull requests or report any issues on our GitHub repository. -->

<!-- License
This project is licensed under the MIT License. -->
  









