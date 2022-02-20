const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const ProductCategory = require('../models/product_category');

router.get('/',async (req,res)=>{
    const page=req.query.page;
    let catId;
    if(req.query.cat){
        catId=await ProductCategory
            .findOne({name:req.query.cat},{_id:1})
            .catch(err=>console.log(err))
    }
    const query= catId ? {category_id : catId} : {}
        await Product
        .find(query)
        .sort({_id:-1})
        .skip(page*12-12)
        .limit(12)
        .then((returned) => {
            let productsToSend = returned.map(item=> item.toObject())
            res.json(productsToSend)
        })
        .catch(err=>console.log(err))
})
module.exports= router;
