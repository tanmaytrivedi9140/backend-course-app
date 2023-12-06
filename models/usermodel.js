const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   username: {type: String , required: true},
   password:{type: String , required: true},
   email: {type: String , required: true, unique: true},
   purchasedCourses: [{type: mongoose.Schema.Types.ObjectId , ref: 'course'}]

})
const User = mongoose.model('user', userSchema);

module.exports = User;

