//To keep secure variable or keys out of the project
const dotnev = require('dotenv');
dotnev.config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database')
const app = express();

//To enable browser to acess resourse
app.use(cors());

//To parse the incoming request
app.use(express.json());

//models
const Product = require('./model/product');
const Variant = require('./model/variant');

//routes
const productRoutes = require('./routes/product');
const variantRoutes = require('./routes/variant');
const searchRoutes  = require('./routes/search')

//Routers
app.use('/product', productRoutes);
app.use('/variant', variantRoutes);
app.use('/search', searchRoutes);

//Database Relationships One-to-Many Relationships

//One-to-Many Relationships
//One Product can have multiple Variants
Product.hasMany(Variant);
Variant.belongsTo(Product);


// Creates models, dropping if it already exists
// sequelize.sync({force:true})
// To automatically synchronize all modules or automatically performs querys
sequelize.sync()
    .then(() => {
        //Listens to the connecton on specified port
        app.listen(4000);
    })
    .catch(error => {
        console.log(error)
    });