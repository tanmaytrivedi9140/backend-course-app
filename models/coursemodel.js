const mongoose = require('mongoose');

const courseModel = new mongoose.Schema({
    title: {type: String  , required: true, unique: true},
    description: {type: String , required: true,unique: false},
    price: {type: String , required: true,unique: false},
    imageLink: {type: String , required: true ,unique: false},
    published: {type: Boolean , required: true , unique: false}

},
{
    timestamps: true
  })
const Course = mongoose.model('course' , courseModel);

module.exports = Course;

