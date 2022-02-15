const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");



router.post('/',async (req,res)=>{
    const userLoggingIn= req.body;
    await User.findOne({email: userLoggingIn.email})
    .then(async( dbUser)=>{
        //created admin user doc with hashed password
        
        // const saltRounds = 10;
        // const myPlaintextPassword = 'full_house_31';
        // const someOtherPlaintextPassword = 'not_bacon';

        // bcrypt.hash(myPlaintextPassword, saltRounds,async  function(err, hash) {
        //     const admin= await new User({
        //         email:'fullhouse@gmail.com',
        //         username:'faida',
        //         password:hash
        //     })
        //     admin.save()
        //     .then(res=>console.log(res))
        //     .catch(err=>console.log(err))
        // });
 
        if(!dbUser){return res.json({message:"Invalid Email or Password"})}
        bcrypt.compare(userLoggingIn.password, dbUser.password)
        .then((isCorrect)=>{
            console.log(isCorrect)

            if(isCorrect){
            // const isAdmin= dbUser.username=="test" ? true : false
                const payload ={
                    id:dbUser._id,
                    username:dbUser.username
                }
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {expiresIn:86400},
                    (err, token)=>{
                        if(err) return res.json({message: err})
                        return res.json({
                            message:"Success",
                            username: dbUser.username,
                            token: "Bearer "+ token,
                            // isAdmin: isAdmin ? true:false
                            })
                    }
                )
    
            }
        })
    })
});
module.exports= router;