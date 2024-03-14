const dbConnection = require("../db/dbConfige");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username, usersid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already exists" });
    }
    if (password.length <= 7) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let savedUser = await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    console.log(savedUser[0]);

    return res.status(StatusCodes.CREATED).json({ msg: "User registered" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter all required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username, firstname, usersid, email, password FROM users WHERE email = ?",
      [email]
    );

    if (
      user.length === 0 ||
      !(await bcrypt.compare(password, user[0].password))
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid Email OR Password" });
    }

    console.log("User retrieved from database:", user[0]);

    const { username, firstname, usersid } = user[0];
    const tokenPayload = { username, firstname, usersid, email }; 
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    
    res.cookie("jwt-token", token, { httpOnly: true }); 

    console.log("Token payload:", tokenPayload); 

    return res
      .status(StatusCodes.OK)
      .json({ msg: "User login successful", token, ...tokenPayload }); 
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}
async function logout(req, res) {
  try {
      // Clear the jwt-token cookie
      res.clearCookie('jwt-token');

      // Remove specific items from local storage
      localStorage.removeItem('questionsData');
      localStorage.removeItem('question');
      localStorage.removeItem('userData');
      localStorage.removeItem('token');

      res.status(StatusCodes.OK).json({ msg: 'User logged out successfully' });
  } catch (error) {
      console.error('Error logging out:', error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
}

module.exports = logout;





async function checkUser(req, res) {
  try {
    const decodedToken = req.user;
    const { username, firstname, usersid, email, } = decodedToken;

    res.status(StatusCodes.OK).json({ msg: "valid user", username, firstname, usersid, email });
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again" });
  }
}


module.exports = { register, login, checkUser, logout };
