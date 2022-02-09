const express = require('express');
const multer = require('multer');
const Product = require('../models/product');
const router = express.Router();
const jwt= require("jsonwebtoken");
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

//this is a cutumised cloudinary in folder cloudinary
const cloudinary = require("../cloudinary");
// require("../cloudinary");
    let creatingProductFolder = async (req,res,next)=>{
    var my_id = mongoose.Types.ObjectId();
    // Creating the folder for the product
    __dirname=path.resolve()
    await fs.mkdir(path.join(__dirname, `uploads/${my_id}`), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log(`uploads/${my_id}`+'Directory created successfully!');
    });
    req.my_id = my_id;  
    next();
    };
    // Multer config
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${req.my_id}`)
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
            cb(null, uniqueSuffix )
        }
    });
    var upload = multer({storage: storage,});

router.post('/', 
    verifyJWT ,
    creatingProductFolder,
    upload.array('images'), 
    async (req,res)=>{
    const uploader = async (path) => await cloudinary.uploads(path,`fullhouse/${req.my_id}`);
    const imgUrlArray = [];
    for (var i = 0; i < req.files.length; i++) {imgUrlArray.push(req.files[i].path)}
    let newArray=[]
    for (const path of imgUrlArray) {
        const newPath= await uploader(path);
        newArray.push(newPath.url)
    }
    const product= new Product({
    _id : req.my_id,
    title: req.body.title,
    price:req.body.price,
    imagesArray: newArray
});
    product.save()
    .then(result => {
        let temp= result.toObject();
        console.log('Product Added');

        const dir = `uploads/${req.my_id}`;
        //remove dir and files
        fs.rmSync(dir, { recursive: true, force: true });
        res.json(temp)
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })

})
function verifyJWT(req, res, next){
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
