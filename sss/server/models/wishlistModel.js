import mongoose from "mongoose";
const WishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        wishlistedStockIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "excelData", // Reference to the Stock model
            },
        ],
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt
    }
);

const wishlistModel = mongoose.model("wishlistData", WishlistSchema, "wishlist-data");

export default wishlistModel;