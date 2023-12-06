
const Course = require('../models/coursemodel');


exports.create_course =async (req,res)=>{
const {title , description ,price ,imageLink, published} = req.body;
  const findCourse = await Course.findOne({title : title});
  if(findCourse)
  {
    res.status(404).send({message: "course already exists" , success: false});
  }
   try {
       const course = new Course(req.body);
       await course.save();
       console.log(course);
       res.status(200).send({message: "course created" , data: course  , success: true});
   } catch (error) {
    res.status(404).send({message: error , success: false});
   }


}



exports.edit_course = async(req,res)=>{
  const {title , description ,price ,imageLink, published} = req.body;
    console.log(req.body);
 try{
  console.log("entered");
  console.log(req.params._id);
  const newCourse = await Course.findByIdAndUpdate(req.params.id , req.body , {new: true});
  res.status(200).send({message: "course updated" , data: newCourse  , success: true});
 }
   catch (error) {
    res.status(404).send({message: error , success: false});
   }
  }
  
  exports.allCourses = async(req,res)=>{
    try {
      const course = await Course.find({published: true});
      res.status(201).send({message: "all published course", data: course , success: true});
    } catch (error) {
      res.status(404).send({message: "no published course", success: false});
    }
      
    };
    


