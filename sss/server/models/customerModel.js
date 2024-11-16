import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
  },
  verifyEmailToken: {
    email: {
      type: String,
      required: true,
    },
  },
  emailVerified: {
    email: {
      type: Boolean,
      default: false,
    },
  },
  verifyPhoneToken: {
    phonenumber: {
      type: String,
      required: true,
    },
  },
  phoneVerified: {
    phonenumber: {
      type: Boolean,
      default: false,
    },
  },
  subscription: {
    plan: { type: String, enum: ["basic", "premium", "none"], default: "none" },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: ["active", "expired"], default: "expired" },
  },
  createdAt: { type: Date, default: Date.now },
});

const customerModel = mongoose.model(
  "RegistrationForm",
  customerSchema,
  "customer-collection"
);

export default customerModel;
