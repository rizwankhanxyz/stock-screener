import authMiddleware from "../middleware/authMiddleware.js";
import basketModel from "../models/basketModel.js";
import express from "express";

const router = express.Router();

/*
api/customer/basket
*/
router.post("/customer/basket/", async (req, res) => {
  try {
    const { stockId } = req.body; // Extract stockId from the request body
    const userId = req.user_id; // Extract userId from the decoded JWT in the auth middleware

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

export default router;
