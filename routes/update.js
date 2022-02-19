const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const Product = require('../models/product');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cloudinary = require("../cloudinary");
const cloudinary2 = require('cloudinary');
const ProductCategory = require('../models/product_category');

// const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("../cloudinary");

    async function removeFiles(req, res,next){
        const dir = `uploads/${req.my_id}`;
        //remove dir and files
        fs.rmSync(dir, { recursive: true, force: true });
        console.log('files of directory :' + dir+' removed');
        
        __dirname=path.resolve()
        await fs.mkdir(path.join(__dirname, `uploads/${req.my_id}`), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log(`uploads/${req.my_id}`+'Directory created successfully!');
    });
        next();
    }
    function get_id(req,res,next){
        console.log('4HI')

        req.my_id=req.params.id
        next(); 
    }
    // Multer config
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${req.my_id}`)
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix )
        }
    });
    var upload = multer({storage: storage});

router.post('/:id',
    // verifyJWT ,
    get_id,
    removeFiles,
    upload.array('images',10),

    async (req,res)=>{
        cloudinary2.api.delete_resources_by_prefix(`fullhouse/${req.my_id}/`, function(result){});

        const uploader = async (path) => await cloudinary.uploads(path, `fullhouse/${req.my_id}/`);

    let id=req.my_id;
    const imgUrlArray = [];
    for (var i = 0; i < req.files.length; i++) {imgUrlArray.push(req.files[i].path)}
    let newArray=[]
    for (const path of imgUrlArray) {
        const newPath= await uploader(path);
        newArray.push(newPath.url)
    }
    // console.log(req.body.cat)
    const catId=await ProductCategory
                        .findOne({name:req.body.cat},{_id:1})
                        .catch(err=>console.log(err))
                        console.log(catId)
    try{
        await Product.updateOne({_id:id},{$set:{
            title:req.body.title,
            price:req.body.price,
            imagesArray: newArray,
            desc: req.body.desc,
            category_id:catId?.id
        }})
        await Product.findOne({_id:id}).then(resp=>res.json(resp))
        // res.json('Updated');
        // res.send()
    }catch(err){
        console.log(err)
    }

})
function verifyJWT(req, res, next){
    console.log(req.headers)

    const token= req.headers['x-access-token']?.split(' ')[1];
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err) return res.json({
                isLoggedIn: false,
                message:"Failed To Authenticate"
            })
            req.user={}
            req.user.id=decoded.id
            req.user.username=decoded.username
            next()
        })
    }else{
        res.json({message: "Incorrect Token Given", isLoggedIn: false});
    }
}
module.exports= router;
