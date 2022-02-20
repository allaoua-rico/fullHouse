const express = require('express');
const Product = require('../models/product');
const { populate } = require('../models/product_category');
const router  = express.Router();
const ProductCategory = require('../models/product_category');

router.get('/:id',async (req,res)=>{
    // const product_id=req.query
    // console.log(req.query)

    await Product.findOne({_id: req.params.id}, { __v:0})
    .populate('category_id',{name:1,_id:0})
    .then(async (product)=>{
    console.log(product)

        let temp= product.toObject();
        if(req.query.update){
            let categories=await ProductCategory.find({},{name:1,_id:0})
            temp={product:temp,cat:categories}
        }
        // console.log(temp)
        res.json(temp);
    })
    .catch((err)=>console.log(err));
    // console.log(req.params.id,'h')
})

module.exports = router;