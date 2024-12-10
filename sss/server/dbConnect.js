import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB 🌎");
  } catch (error) {
    console.log(error);
  }
}

connectDb();
export default connectDb;
