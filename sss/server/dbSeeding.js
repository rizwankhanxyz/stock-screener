import mongoose from "mongoose";
import "./dbConnect.js";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  psw: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
});

const Admin = mongoose.model("Admin", adminSchema, "admin");

async function insertNewAdmin() {
  try {
    let password = await bcrypt.hash("Sess@123", 12);
    const admin = new Admin({
      fullname: "Admin Rizwan",
      email: "rizwan@rizwankhan.xyz",
      psw: password,
    });
    await admin.save();
    console.log("new Admin is created");
  } catch (error) {
    console.log(error);
  }
}

await insertNewAdmin();

export default Admin;