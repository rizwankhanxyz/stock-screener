import jwt from "jsonwebtoken";
import Admin from "../dbSeeding.js";
import customerModel from "../models/customerModel.js";
import dotenv from "dotenv";
dotenv.config();

async function authMiddleware(req, res, next) {
  try {
    // const token = req.headers["auth-token"];
    // Log cookies to see what is being sent
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ error: "No token available/Login required." });
    }
    // Log the token being verified
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user =
      (await Admin.findById(decoded.user_id)) ||
      (await customerModel.findById(decoded.user_id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    req.decoded = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauth/ Expired token." });
  }
}

export default authMiddleware;
