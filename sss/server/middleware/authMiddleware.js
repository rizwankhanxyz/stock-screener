import jwt from "jsonwebtoken";
import Admin from "../dbSeeding.js";
import customerModel from "../models/customerModel.js";

async function authMiddleware(req, res, next) {
  try {
    // const token = req.headers["auth-token"];
    // Log cookies to see what is being sent
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    // Log the token being verified
    let decoded = jwt.verify(token, "stockscreener@shariahequities"); //a

    const user = await Admin.findById(decoded.user_id) ||await customerModel.findById(decoded.user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    req.decoded=decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauth Token or token expired" });
  }
}

export default authMiddleware;
