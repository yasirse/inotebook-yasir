const express=require('express')
const router=express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Harryisagoodb$oy';
// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
                    body('name', 'Enter a valid name').isLength({ min: 3 }),
                    body('email', 'Enter a valid email').isEmail(),
                    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
                ], async (req, res)=>{ 
  // If there are errors, return Bad request and the errors
  console.log("error1");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    console.log("error2");
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log("error3");
      // console.log("user already exist="+user.name)
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }
      console.log("error5");
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        console.log("error4");
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        password: secPass,
        email: req.body.email,
      })
      
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      //res.json(user);
      res.json(authtoken);
    }
    catch(error)
    {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }

})
module.exports=router

