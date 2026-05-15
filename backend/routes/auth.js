import express from 'express';
import User from '../models/User.js';
const router = express.Router();


// create a user using POST method with route "api/auth" and it doesn't require authentication 
router.post('/',  (request, response) => {
  console.log(request.body)
  const user = new User(request.body);
   user.save();
  response.send(request.body)
  
  // response.json(user)
})
export default router