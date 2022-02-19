const mongoose= require('mongoose');

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc: String
  });

  // const ProductCategory = mongoose.model('ProductCategory', categorySchema);
  // const productCategory = new ProductCategory({
  //   name: "Salon",
  //   desc:""
  // })
  // productCategory.save(function (err, doc) {
  //   console.log(doc._id);
  //   console.log(err);
  
  // }); 
module.exports = mongoose.model('ProductCategory', categorySchema);