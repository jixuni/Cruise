const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwtSecret");
require("dotenv").config();
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Authorization header is missing Bearer token");
    error.statusCode = 401;
    throw error;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT);
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }
  next();
};
