import express from "express";
import bcrypt from "bcrypt";

//models
import customerModel from "../models/customerModel.js";
// import Admin from "../dbSeeding.js";

//Utilities
// import sendEmail from "../utils/sendEmail.js";
// import sendSMS from "../utils/sendMessage.js";

// import config from "config";
// import jwt from "jsonwebtoken";
// import authMiddleware from "../middleware/auth.js";

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
      const foundPhone = await customerModel.findOne({ phonenumber: req.body.phonenumber});

      //email & phone validation
      if (foundPhone) {
        return res
          .status(400)
          .json({
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

export default router;
