import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//models
import customerModel from "../models/customerModel.js";
import Admin from "../dbSeeding.js";

//Utilities
import sendEmail from "../utils/sendEmail.js";
import sendSMS from "../utils/sendMessage.js";

import authMiddleware from "../middleware/authMiddleware.js";
import {
  validateErrors,
  registerMiddleware,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

/*
 * API: /api/customer/register
 * METHOD: POST
 * DESC: customer Signup
 * Body: fullname, email, password,phone
 * Access: Public
 * Validations: email is unique, password strength, etc
 */
router.post(
  "/register",
  registerMiddleware(),
  validateErrors,
  async (req, res) => {
    try {
      const foundEmail = await customerModel.findOne({ email: req.body.email });
      const foundPhone = await customerModel.findOne({
        phonenumber: req.body.phonenumber,
      });

      //email & phone validation
      if (foundPhone) {
        return res.status(400).json({
          error: "Phone number already exist, provide a different number.",
        });
      } else if (foundEmail) {
        return res
          .status(400)
          .json({ error: "You are already registered, Login to continue." });
      }
      //password encrypted
      let hash = await bcrypt.hash(req.body.password, 12);
      req.body.password = hash;

      //Generating Email & Phone Token
      const customerData = await customerModel(req.body);
      let emailToken = (Math.random() + 1).toString(16).substring(2);
      let smsToken = (Math.random() + 1).toString(16).substring(2);

      customerData.verifyEmailToken = { email: emailToken };
      customerData.verifyPhoneToken = { phonenumber: smsToken };

      await customerData.save();

      // Sending Email with Token
      // sendEmail({
      //   to: req.body.email,
      //   subject: "Rizwan Tasky App Solutions Pvt. Ltd - Email Confirmation",
      //   body: `Hello ${req.body.fullname} <br/>
      // Welcome to Rizwan Tasky App Solutions, <br/>
      // Please <a href='http://localhost:5000/api/user/verify/email/${emailToken}'>Click Here</a><br/> to get verified.<br/>
      // Thank You,<br/>
      // <b>Team Tasky</b>`,
      // });

      //Sending Message with Token
      // const clicking = `http://localhost:5000/api/user/verify/phonenumber/${smsToken}`;
      // sendSMS({
      //   to: req.body.phonenumber,
      //   body: `Hey ${req.body.fullname},\nGet Verified by: ${clicking} here.\nThank You,\nTeam Tasky`,
      // });

      res.status(200).json({
        success:
          "Successfully Regiestered, Kindly check your Email for the verificaton.",
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error, Try Again" });
    }
  }
);

/*
 * API: /api/customer/login
 * METHOD: POST
 * DESC: User Signin
 * Body: email, password
 * Access: Public
 * Validations: email is present in db if yes next is password match
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let userData =
      (await Admin.findOne({ email })) ||
      (await customerModel.findOne({ email }));

    if (!userData) {
      return res.status(401).json({
        error: "Email not found, please enter correct email.",
      });
    }
    const compareHash = await bcrypt.compare(password, userData.password);
    if (!compareHash) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    let payload = {
      user_id: userData._id,
      email: userData.email,
      role: userData.role,
    };

    let accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    let refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", accessToken, {
      httpOnly: true, // prevents access from JavaScript
      secure: process.env.NODE_ENV === "production", // only sends over HTTPS in production
      sameSite: "Strict", // CSRF protection
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    });
    res.status(200).json({
      success: "Login Sucessful",
      role: userData.role,
      refreshToken: refreshToken,
      alias: userData.fullname,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error, Try Again" });
  }
});

/*
 * API: /api/customer/auth
 * METHOD: GET
 * DESC: User Authentication
 * Body: token
 * Access: Public
 * Validations:
 */

router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const token = req.cookies.token; // Retrieve token from cookies
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).send({ token: true, role: decoded.role }); //alias: decoded.alias
  } catch (error) {
    res.status(401).json({ error: "Unauth Token or token expired" });
  }
});

/*
 * API: /api/customer/logout
 * METHOD: POST
 * DESC: User Logoout
 * Body: token
 * Access: Public
 * Validations:
 */

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.clearCookie("token");
  res.end();
});

export default router;
