// authMiddleware.js
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ success: false, message: "Invalid token", error });
  }
};

module.exports = authMiddleware;
