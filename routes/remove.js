const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const Product = require('../models/product');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary');

let upload = multer();

// async function removeRepository(req, res,next){
//     const dir = `uploads/${req.my_id}`;
//       //remove dir and files
//       fs.rmSync(dir, { recursive: true, force: true });
//     next();
// }
 function get_id(req,res,next){
    req.my_id=req.body.id
    next();
}

router.post('/',
    // verifyJWT ,
    upload.fields([]),
    get_id,
    // removeRepository,
    async (req,res)=>{
    //delete files in folder
    await cloudinary.api.delete_resources_by_prefix(`fullhouse/${req.my_id}/`, function(result){});
    //delete empty folder
    cloudinary.v2.api.delete_folder(`fullhouse/${req.my_id}/`, function(error, result){console.log(result);});

    Product.deleteOne({_id:req.my_id}).then(removed=>
      {  
          console.log(removed)
        res.json("deleted")
    }
    )
    Product.findOne({_id:req.my_id})
    console.log(req.my_id)
})

module.exports= router;
