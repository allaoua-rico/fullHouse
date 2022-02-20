const express = require('express');
const router = express.Router();
const ProductCategory = require('../models/product_category');

router.get('/', (req,res)=>{
     ProductCategory.find({},{name:1,_id:0})
                                    .then(doc=>res.json(doc))
})
module.exports= router;
