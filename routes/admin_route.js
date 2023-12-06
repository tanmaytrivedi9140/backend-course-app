const express = require('express');
const Admin = require('../models/adminmodel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config();



exports.admin_signup = async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      // Check if an admin with the given email already exists
      const existingAdmin = await Admin.findOne({ email: email });
  
      if (existingAdmin) {
        return res.status(409).send("Admin already exists");
      }
  
      // If no existing admin, create a new one
      const newpass = await bcrypt.hash(req.body.password, 10);
      console.log(newpass);
      


      const newAdmin = new Admin({
        username: username,
        password: newpass,
        email: email
      });
     
      // Save the new admin to the database
      const savedAdmin = await newAdmin.save();
  
      res.status(201).json({
        message: "user created", 
        data: savedAdmin
      });  // Sending the saved admin as a response can be useful for further client interactions
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };




exports.admin_login = async(req,res)=>{
    const {email  , password} = req.body;
    const user =await Admin.findOne({email:email });
    if(!user)
    {
        res.status(404).send({message : "user does nor exist" , success: false});
    }
    try {
        const genAdmin =await bcrypt.compare(password , user.password);
        if(!genAdmin)
        {
            res.status(404).send({message : "password incorrect" , success: false}); 
        }
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          console.log(token);
          // save user token
         
         res.status(201).send({
            message: "login success", 
            success: true ,
            data : token
         })
    } catch (error) {
        res.status(404).send({message : "server error" , success: false}); 
    }


}



