// Models
const Product = require('../model/product');
const Variant = require('../model/variant');

const Sequelize = require('sequelize');

//To use SQL operators
const Op = Sequelize.Op;

//To verify the string variable
function isStringInvalid(string) {
    if (string == undefined || string.length === 0) {
        return true;
    }
    else {
        return false;
    }
}

//Searching for products based on their name and description and searching for variants based on their name
const get = async (req, res) => {
    try {
        const word = req.params.word;
        //Verifiyng the received variables 
        if (isStringInvalid(word)) {
            return res.status(400).json({ message: 'Please enter a walid word for search', success: false });
        }

        //Searching the products from the database based on their name and description
        const products = await Product.findAll({
            where: {
                [Op.or]: [{ name: { [Op.like]: `%${word}%` } }, { description: { [Op.like]: `%${word}%` } }]
            }
        });
 
        //Searching the variants from the database based on their name
        const variants = await Variant.findAll({ where: { name: { [Op.like]: `%${word}%` } } });
    
        if ( products.length>0 || variants.length>0 ) {
            //product or variants are found
            return res.status(200).json({ success: true, message: 'Product is found', products: products, variants: variants });
        }
        //product or variants are not found
        return res.status(404).json({ success: false, message: 'Product is not found' });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}

module.exports = {
    get
}