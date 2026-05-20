import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
const router = express.Router();

// create a user using POST method with route "api/auth/createUser" and it doesn't require authentication
router.post(
  "/createUser",
  // express validators for validatoin
  [
    body("name", "Name must be at least 5 characters").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 8 characters").isLength({
      min: 8,
    }),
  ],
  async (request, response) => {
    // check if the request contain nothing then throw bad request
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).json({ errors: result.array() });
    }

    try {
      console.log("before creating user");
      console.log("user email:", request.body.email);
      console.log(request.body);
      // creating new user using new User and save
      let user = await User.findOne({ email: request.body.email });
      // checking if user exist with current email then throw bad request
      if (user) {
        return response
          .status(400)
          .json({ email: "Sorry a user already exist with this email" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(request.body.password, salt);
      user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword
      });
      user.save();
      console.log("after creating user and user is saved into db");
      response.json(user);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);
export default router;
