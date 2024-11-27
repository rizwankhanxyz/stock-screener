import basketModel from "../models/basketModel.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

/*
post
api/baskets/customer/basket/add
*/
router.post("/customer/basket/create", async (req, res) => {
  try {
    const token = req.cookies.token; // Assuming token is stored in cookies
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }
    const decoded = jwt.verify(token, "stockscreener@shariahequities");
    const userId = decoded.user_id; // Extract userId from the decoded JWT in the auth middleware

    const { basketName, basketDescription, stockIds } = req.body; // Extract data from request body

    const basketItem = new basketModel({
      userId,
      basketName,
      basketDescription,
      stockIds,
    });
    await basketItem.save();
    res.status(201).json({
      success: "Stock added to basket successfully.",
      basketItem,
    });
  } catch (error) {
    console.error("Error adding stock to basket:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

/*
get
api/baskets/customer/basket/get
*/

// Get user's basket
router.get("/customer/basket/get", async (req, res) => {
  try {
    const token = req.cookies.token; // Assuming token is stored in cookies
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }
    const decoded = jwt.verify(token, "stockscreener@shariahequities");
    const userId = decoded.user_id;
    const basketItems = await basketModel.find({ userId }).populate("stockIds");
    if (!basketItems.length) {
      return res.status(404).json({ error: "No items found in the basket. " });
    }
    res.status(200).json({
      success: "Basket items retrieved successfully.",
      count: basketItems.length,
      basketItems,
    });
  } catch (error) {
    console.error("Error fetching basket items:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});
export default router;
