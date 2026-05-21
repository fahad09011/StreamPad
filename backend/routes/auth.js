import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fetchUser from '../middleware/fetchUser.js';
const router = express.Router();

// End point 1 create user :-
// create a user using: POST method with route "api/auth/createUser"  no auth required??
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
      // console.log("before creating user");
      // console.log("user email:", request.body.email);
      // console.log(request.body);
      // creating new user using new User and save
      let user = await User.findOne({ email: request.body.email });
      // checking if email already exist with current email then throw bad request with erro message
      if (user) {
        return response
          .status(400)
          .json({ email: "Sorry a user already exist with this email" });
      }
      // password hashing with salt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(request.body.password, salt);
      user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword
      });
      user.save();
      console.log("after creating user and user is saved into db");

            // future fix: dont return full user info , just show success message and boolean
      response.json(user);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// End point 2 login user:-
// Authenticate user using jwt token with: POST method with route "api/auth/login" no login required
router.post(
  "/login",
  // express validators for validatoin
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (request, response) => {
    // check if the request contain nothing then throw bad request
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).json({ errors: result.array() });
    }
const {email, password} = request.body
    try {
      
      let user = await User.findOne({email});
      // checking if user's email match with DB ones, if not then throw bad request
      if (!user) {
        return response
          .status(400)
          .json({ email: "Please enter correct crdentials" });
      }
      
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return response
          .status(400)
          .json({ email: "Please enter correct crdentials" });
      }
      // JWT payload
      const data ={
        user: {id: user.id}
      }
      // generating JWT token
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      // future fix: dont return full user info , just show success message and boolean
      response.json({
        user,
        authToken
      });
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);


// End point 3 getting user data :-
router.post("/getuser", fetchUser, async(request, response)=>{
  try {
    // request.user.id comes from header token
    const user = await User.findById(request.user.id).select('-password');
    response.json(user);

  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
