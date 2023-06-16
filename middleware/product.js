// Models
const Product = require('../model/product');

//To verify the number variable
function isNumberInvalid(number) {
    if (number == undefined || isNaN(number)) {
        return true;
    }
    else {
        return false;
    }
}

//Finding the product for the variant
const middleware = async (req, res, next) => {
    try {
        const { productId } = req.body;
        //Verifiyng the received number variables 
        if ( isNumberInvalid(productId)) {
            return res.status(400).json({ message: 'productId is missing or productId should be a number', success: false });
        }
        
        const product = await Product.findByPk(productId);
        req.product = product;
        next();
    } 
    catch (err) {
        return res.status(401).json({success: false});
    }
}

//To export the functions
module.exports = {
    middleware
}