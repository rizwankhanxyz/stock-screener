import basketModel from "../models/basketModel.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

/*
post
api/baskets/customer/basket/add
*/
router.post("/customer/basket/add", async (req, res) => {
  try {
    const token = req.cookies.token; // Assuming token is stored in cookies
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }
    const decoded = jwt.verify(token, "stockscreener@shariahequities");
    const { stockId } = req.body; // Extract stockId from the request body
    const userId = decoded.user_id; // Extract userId from the decoded JWT in the auth middleware

    // Check if the stock is already in the user's basket
    let existingBasketItem = await basketModel.findOne({ userId, stockId });

    if (existingBasketItem) {
      return res.status(400).json({ error: "Stock is already in the basket." });
    }

    // Add the stock to the user's basket
    const basketItem = new basketModel({ userId, stockId });
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
    const basketItems = await basketModel.find({ userId }).populate("stockId");
    if (!basketItems.length) {
      return res.status(404).json({ error: "No items found in the basket. " });
    }
    res.status(200).json({
      success: "Basket items retrieved successfully.",
      basketItems,
    });
  } catch (error) {
    console.error("Error fetching basket items:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});
export default router;
