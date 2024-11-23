import mongoose from "mongoose";
const basketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    basketName: {
      type: String,
      required: true,
    },
    basketDescription: {
      type: String,
    },
    stockIds: [
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

const basketModel = mongoose.model("basketData", basketSchema, "basket-data");

export default basketModel;
