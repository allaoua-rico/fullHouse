const express = require('express');
// const multer = require('multer');
const Product = require('../models/product');
const router = express.Router();


router.get(`/`, async (req, res) => {
    // delete mongoose.connection.models['Product'];

    console.log('here')
    try{
        let productsToSend=[];
        await Product
        // .deleteMany({})
    .find({}, { __v:0,})
    // .limit(5)
    .sort({_id:-1})
    .limit(8)
    .then( (returned) => {
            productsToSend = returned.map(item=>{
                let temp= item.toObject()
                return temp;
            })

            res.json(productsToSend)
        }
    )
}
    catch(err){   
        console.log('err');
        res.status(500).send('An error occurred', err);
    
    }
});
// router.post('/', upload.single('image') , async(req, res)=>{
//     const product= new Product({
//         title: req.body.title,
//         // _id: new mongoose.Types.ObjectId().toHexString(),
//         price:req.body.price,
//         rating: req.body.rating,
//         image: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: req.file.mimetype
//         }
//     });

//     try{
//         const newProduct= await product.save();
//     }catch(err){
//         console.log(err);
//     }
//     const response="<img src="+ product.imagePath + "> </img>"
//     res.send(response);
// })
module.exports= router;