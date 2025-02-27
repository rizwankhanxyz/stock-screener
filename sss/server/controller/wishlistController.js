import wishlistModel from "../models/wishlistModel.js";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/customer/wishlist/toggle", async (req, res) => {
    try {
        const token = req.cookies.token; // Assuming token is stored in cookies
        if (!token) {
            return res
                .status(401)
                .json({ error: "Unauthorized. No token provided." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user_id; // Extract userId from the decoded JWT in the auth middleware

        // const { wishlistedStockIds } = req.body; // Extract data from request body
        const { stockId } = req.body; // Extract data from request body

        let wishlist = await wishlistModel.findOne({ userId });

        if (!wishlist) {
            // If no wishlist exists, create one
            wishlist = new wishlistModel({ userId, wishlistedStockIds: [stockId] });
        } else {
            // Check if stock already exists in wishlist
            const index = wishlist.wishlistedStockIds.indexOf(stockId);
            if (index > -1) {
                // Stock already exists -> Remove it (Unwishlist)
                wishlist.wishlistedStockIds.splice(index, 1);
            } else {
                // Stock does not exist -> Add it
                wishlist.wishlistedStockIds.push(stockId);
            }
        }
        await wishlist.save();
        res.status(200).json({
            success: "Wishlist updated successfully.",
            wishlist,
        });
    } catch (error) {
        console.error("Error updating wishlist:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
});


router.get("/customer/wishlist", async (req, res) => {
    try {
        const token = req.cookies.token; // Assuming token is stored in cookies
        if (!token) {
            return res
                .status(401)
                .json({ error: "Unauthorized. No token provided." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user_id;
        const wishlist = await wishlistModel.findOne({ userId }).populate("wishlistedStockIds");
        if (!wishlist) {
            return res.status(200).json({ wishlist: [] }); // Return empty array if no wishlist exists
        }
        res.status(200).json({ wishlist: wishlist.wishlistedStockIds });

    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
});

export default router;