const mongoose= require('mongoose');
const ProductCategory = require('./product_category');


const productSchema= new mongoose.Schema({
    // product_id:{
    //     type:Number
    // },
    title:{
        type:String,
        required:true
    },
    // image:{
    //     data: Buffer,
    //     contentType: String,
    // },
    price:{
        type:Number  
      }, 
    imagesArray: {
        type: Array
    }
    // rating:{
    //     type:String 
    //    },
    // imageType:{
    //     type: String
    //     }
}
// ,{_id:false }
);
productSchema.add({ desc : 'string' });
productSchema.add({ category_id : {type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory'} });
        // const Product = mongoose.model('Product', productSchema);


//     await ProductCategory
//     .find({name:"Literie"})
//     .then((returned) => {
//         // console.log(returned[0].id)

//         const Product = mongoose.model('Product', productSchema);
//         ProductCategory.find({name:"Literie"})
//         const product = new Product({
//         title:"title",
//         price:100, 
//         category_id:returned[0].id
//         })
//         product.save(function (err, doc) {
//           console.log(doc);
//           console.log(err);
        
//         }); 
// })
    // await Product.find({title:"title"})
    // // .populate("category_id")
    // .then((returned)=>console.log(returned))




// productSchema.virtual('imagePath').get(function() {
//     if (this.image != null ) {
//       return `data:${this.image.contentType};charset=utf-8;base64,${this.image.data.toString('base64')}`;
//     }
//   })
  module.exports = mongoose.model('Product', productSchema);