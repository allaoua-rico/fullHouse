const express = require('express');
const Product = require('../models/product');
const router  = express.Router();

router.get('/:id',async (req,res)=>{
    // const product_id=req.params.id
    //i have to change the serach from searching product_id to id
    await Product.findOne({_id: req.params.id}, { __v:0})
    .then((product=>{
        // let {image, ...response1}= product.toObject()
        // let temp={...response1, "imagePath":product.imagePath}
        let temp= product.toObject();
        res.json(temp);
    }))
    .catch((err)=>console.log(err));
    // console.log(req.params.id,'h')
})

module.exports = router;