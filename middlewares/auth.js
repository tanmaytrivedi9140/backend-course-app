const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async(req,res ,next)=>{
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token , process.env.TOKEN_KEY ,  (err , decoded)=>{
            if(err)
            {
                res.status(403).send({message: "auth failed" , success: false, data: err});
            }
            else{
                req.user.id = decoded.id;
                next();
            }
        } );
    } catch (error) {
        res.status(403).send({message: "auth failed" , success: false, data: err});
    }
 

}