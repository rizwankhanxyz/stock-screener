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

//Delete User's Basket
/*
delete
api/baskets/customer/basket/:basketId
*/

// Delete a basket and associated stocks
router.delete("/customer/basket/:basketId", async (req, res) => {
  try {
    const token = req.cookies.token; // Assuming token is stored in cookies
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }
    const decoded = jwt.verify(token, "stockscreener@shariahequities");
    const userId = decoded.user_id;
    const { basketId } = req.params;

    const basket = await basketModel.findOne({ _id: basketId, userId });

    if (!basket) {
      console.log("Basket not found");
      return res.status(404).json({ error: "Basket not found." });
    }

    // Delete the basket
    await basketModel.findByIdAndDelete(basketId);

    res
      .status(200)
      .json({ success: "Basket and associated stocks deleted successfully." });
  } catch (error) {
    console.error("Error deleting basket:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

//Delete stock from a User's Basket
/*
method: delete
api/baskets/customer/basket/:basketId/remove-stock/:stockId
*/
// Delete stock from a basket
router.delete("/customer/basket/:basketId/remove-stock/:stockId", async (req, res) => {
  try {
    const { basketId, stockId } = req.params;

    const basket = await basketModel.findById(basketId);

    if (!basket) {
      return res.status(404).json({ error: "Basket not found." });
    }

    // Remove the stock from the basket
    basket.stockIds = basket.stockIds.filter((id) => id.toString() !== stockId);
    await basket.save();

    res.status(200).json({
      success: "Stock removed from basket successfully.",
      basket,
    });
  } catch (error) {
    console.error("Error removing stock from basket:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});


export default router;
