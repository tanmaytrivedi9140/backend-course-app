const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config();
const connectDb= require('./dbconfig/dbconfig');
const {admin_signup , admin_login } = require('./routes/admin_route');
const {create_course, edit_course,allCourses } = require('./routes/course_route');
const {user_signup , user_login ,purchased_courses , getAllpur} = require('./routes/user_routes');
const port = process.env.port || 3000;
const router = require('router');
connectDb();
const app = express();
app.use(express.json());
app.use(bodyparser.json());




// admin routes---------------------------





app.post('/admin/signup', admin_signup);

app.post('/admin/login',admin_login);

app.post('/admin/courses', create_course);

app.put('/admin/courses/:_id', edit_course);

app.get('/admin/courses', allCourses);




// user routes---------------------------------------
app.post('/users/signup',user_signup);

app.post('/users/login' , user_login);

app.get('/users/courses' , allCourses);

app.post('/users/courses/:_courseId' , purchased_courses);

app.get('/users/purchasedCourses' , getAllpur);






// general-----------------


app.get('/', (req, res)=>{
    res.send('hello server this side')
});








// port no for server -----------------------------
app.listen(port , ()=>{
    console.log("listening in port 5000");
})
// 656e3c104768eacc6e682d36