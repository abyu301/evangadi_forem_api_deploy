// authMiddleware.js

const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Define JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
 
  if (req.path === "/logout") {
    
    res.clearCookie("jwtToken"); 
    return res.redirect('/login');
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];
  // console.log("Received token:", token);

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authentication invalid, invalid Token" });
    }
    console.log("Decoded token:", decodedToken);
    
    req.user = decodedToken;
    console.log("Authenticated user:", req.user);
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error("Token expired:", error);
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.error("Invalid token:", error);
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
    } else {
      console.error("JWT verification error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
    }
  }
}

module.exports = authMiddleware;
