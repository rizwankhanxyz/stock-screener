import mongoose from "mongoose";
async function connectDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://iconrizwankhan:iconrizwan123@cfi-b24.nxo1n.mongodb.net/sss"
    );
    console.log("Connected to MongoDB 🌎");
  } catch (error) {
    console.log(error);
  }
}

connectDb();
export default connectDb;
