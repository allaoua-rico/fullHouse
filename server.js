if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express');
const app = express();
const cors= require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const auth = require('./routes/auth');
const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");
const User= require("./models/user");
const loginRouter = require("./routes/login.js");
const indexRouter = require("./routes/index.js");
const addProductRouter = require("./routes/addProduct.js");
const detailsRouter = require("./routes/details.js");
const updateRouter = require("./routes/update.js");
const removeRouter = require("./routes/remove.js");
const productsRouter = require("./routes/products.js");
const corsRouter = require("./routes/cors.js");
const getCategoriesRouter = require("./routes/getCategories.js");
const ProductCategory = require('./models/product_category');

app.use(cors({origin:true}));
app.use(express.json());
// app.options('*', cors());

// require('./passport');

// app.use('/auth', auth);
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

// Set EJS as templating engine 
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use('/api/', indexRouter);
app.use('/api/login', loginRouter);
app.use('/api/addProduct', addProductRouter);
app.use('/api/details', detailsRouter);
app.use('/api/update', updateRouter);
app.use('/api/remove', removeRouter);
app.use('/api/products', productsRouter);
app.use('/api/cors', corsRouter);
app.use('/api/getCategories', (req,res)=>{
  ProductCategory.find({},{name:1,_id:0})
                  .then(doc=>res.json(doc))
      });

//must be last , cause catch all routes
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db= mongoose.connection;
db.on('error', error=> console.error(error));
db.once('open', ()=>console.log('connected to mongoose'));


const port =process.env.PORT || 4000
app.listen(port,function (err) {
  if (err) {
   console.log(err)
   return
  }
  console.log('Listening at http://localhost:' + port+ '\n')
 })
 