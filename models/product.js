const mongoose= require('mongoose');

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

// productSchema.virtual('imagePath').get(function() {
//     if (this.image != null ) {
//       return `data:${this.image.contentType};charset=utf-8;base64,${this.image.data.toString('base64')}`;
//     }
//   })
  module.exports = mongoose.model('Product', productSchema);