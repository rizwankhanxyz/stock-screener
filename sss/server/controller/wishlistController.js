import wishlistModel from "../models/wishlistModel.js";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

/*
post
api/wishlist/customer/wishlist/add
*/
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

/*
get
api/wishlist/customer/wishlist/
*/
// Get user's basket
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
        const wishlist = await wishlistModel.find({ userId }).populate("wishlistedStockIds");
        res.status(200).json({ wishlist: wishlist ? wishlist.wishlistedStockIds : [] });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
});

//Delete User's Basket
/*
delete
api/baskets/customer/basket/:basketId
*/

// Delete a basket and associated stocks
// router.delete("/customer/basket/:basketId", async (req, res) => {
//     try {
//         const token = req.cookies.token; // Assuming token is stored in cookies
//         if (!token) {
//             return res
//                 .status(401)
//                 .json({ error: "Unauthorized. No token provided." });
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const userId = decoded.user_id;
//         const { basketId } = req.params;

//         const basket = await basketModel.findOne({ _id: basketId, userId });

//         if (!basket) {
//             console.log("Basket not found");
//             return res.status(404).json({ error: "Basket not found." });
//         }

//         // Delete the basket
//         await basketModel.findByIdAndDelete(basketId);

//         res
//             .status(200)
//             .json({ success: "Basket and associated stocks deleted successfully." });
//     } catch (error) {
//         console.error("Error deleting basket:", error);
//         res.status(500).json({ error: "Internal Server Error." });
//     }
// });

//Delete stock from a User's Basket
/*
method: delete
api/baskets/customer/basket/:basketId/remove-stock/:stockId
*/
// Delete stock from a basket
// router.delete(
//     "/customer/basket/:basketId/remove-stock/:stockId",
//     async (req, res) => {
//         try {
//             const { basketId, stockId } = req.params;

//             const basket = await basketModel.findById(basketId);

//             if (!basket) {
//                 return res.status(404).json({ error: "Basket not found." });
//             }

//             // Remove the stock from the basket
//             basket.stockIds = basket.stockIds.filter(
//                 (id) => id.toString() !== stockId
//             );
//             await basket.save();

//             res.status(200).json({
//                 success: "Stock removed from basket successfully.",
//                 basket,
//             });
//         } catch (error) {
//             console.error("Error removing stock from basket:", error);
//             res.status(500).json({ error: "Internal Server Error." });
//         }
//     }
// );

export default router;
