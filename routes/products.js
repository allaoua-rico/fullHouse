const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const fs = require('fs');
const path = require('path');
const ProductCategory = require('../models/product_category');

router.get('/',async (req,res)=>{
    // console.log('here')
    const page=req.query.page;
    let catId;
    if(req.query.cat){
        const cat=req.query.cat;
        try{
            catId=await ProductCategory.findOne({name:cat},{_id:1})
            .then(res=>catId=res)
        }catch(err){console.log(err)}
    }
// console.log(catId)

    try {
        await Product
        .find({category_id:catId})
        .sort({_id:-1})
        .skip(page*12-12)
        .limit(12)
        .then((returned) => {
            productsToSend = returned.map(item=>{
                let temp= item.toObject()
                return temp;
            })
            res.json(productsToSend)
        })
    } catch (error) {
        console.log(error)
    }
    // console.log(page)
})

module.exports= router;
