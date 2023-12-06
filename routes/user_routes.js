const User = require('../models/usermodel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config();
const Course = require('../models/coursemodel');
exports.user_signup = async(req,res) =>{
    const { username, password, email } = req.body;
  
    try {
      // Check if an admin with the given email already exists
      const user = await User.findOne({ email: email });
  
      if (user) {
        return res.status(409).send("Admin already exists");
      }
  
      // If no existing admin, create a new one
      const newpass = await bcrypt.hash(req.body.password, 10);
      console.log(newpass);
      


      const newAdmin = new User({
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
}




exports.user_login = async(req,res)=>{
    const {email  , password} = req.body;
    const user =await User.findOne({email:email });
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



exports.purchased_courses = async(req,res) =>{
    const courseId = req.params._courseId;
  
    const id = courseId.slice(1,courseId.length).toString();
   
    const course = await Course.findById(id);

    if(course!=null)
    {    
        const user = await User.findOne({email: req.body.email});
    
          if(user!=null)
          {    
            try {
                for(let i=0;i<user.purchasedCourses.length;i++)
                { 
                    if(user.purchasedCourses[i].toString() === id){
                        res.status(404).send({message: "already purchased", data: user.purchasedCourses});
                       }
                }
                 user.purchasedCourses.push(course);
                await user.save();
                res.status(404).send({message: "course purchased successfully", data: user.purchasedCourses});

            } catch (error) {
                res.status(404).send({message: "li error", data: user});
            }
          }
          else{
            res.status(404).send({message: "no such user exist", Success: false});
          }
     
    }
    else{
        res.status(404).send({message: "no such course exist", Success: false}); 
    }
  
  
}




exports.getAllpur = async(req,res)=>{
    const user = await User.findOne({email:req.body.email});
    const purcourses = user.purchasedCourses;
    console.log(purcourses.length);
    let list = [];
    for(let i=0;i<purcourses.length;i++)
    {
        const pur = await Course.findOne({_id:purcourses[i].toString()});
        list.push(pur);
    }
    res.status(200).send({message: "list of courses purchased" , data: list , success: true});
}