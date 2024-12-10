import { body, validationResult } from "express-validator";

function registerMiddleware() {
  return [
    body("fullname", "Full Name can't be empty").notEmpty(),
    body("phonenumber", "A valid 10 Digit Phone Number, Please")
      .isLength({ min: 10, max: 10 })
      .isMobilePhone("en-IN"),
    body("email", "Please enter a vaild email").isEmail(),
    body(
      "password",
      "Minimum 8 Characters,1 Lowercase,1 UpperCase,1 number,1 Symbol"
    ).isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  ];
}

function validateErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
}

export { registerMiddleware, validateErrors };