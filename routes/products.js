const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const fs = require('fs');
const path = require('path');

router.get('/',async (req,res)=>{
    console.log('here')
    const page=req.query.page;
    try {
        await Product
        .find({})
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
    console.log(page)
})

module.exports= router;
