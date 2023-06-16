// Models
const Product = require('../model/product');
const Variant = require('../model/variant');

//To verify the string variable
function isStringInvalid(string) {
    if (string == undefined || string.length == 0) {
        return true;
    }
    else {
        return false;
    }
}

//To verify the number variable
function isNumberInvalid(number) {
    if (number == undefined || isNaN(number)) {
        return true;
    }
    else {
        return false;
    }
}

//Adding a single product to database
const add = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        //Verifiyng the received string variables 
        if (isStringInvalid(name) || isStringInvalid(description)) {
            return res.status(400).json({ message: 'name or description is missing', success: false });
        }
        //Verifiyng the received number variables 
        if (isNumberInvalid(price)) {
            return res.status(400).json({ message: 'price is missing or price should be a number', success: false });
        }
        // Storing the product in the database
        await Product.create({ name, description, price });
        return res.status(201).json({ success: true, message: 'Product has been added' });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}


//Getting a single product and its variants from the database
const get = async (req, res) => {
    try {
        const id = req.params.productId;
        //Verifiyng the received variables 
        if (isStringInvalid(id)) {
            return res.status(400).json({ message: 'productId is missing', success: false });
        }
        //Finding the product from the database
        const product = await Product.findByPk(id);
        //Finding the variants of a single product from the database
        const variants = await Variant.findAll({where:{productId: id}});
        if (product) {
            //product found
            return res.status(200).json({ success: true, message: 'Product is found', product: product, variants:variants });
        }
        //product not found
        return res.status(404).json({ success: false, message: 'Product is not found' });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}

//Getting all the products from the database
const getall = async (req, res) => {
    try {
        const products = await Product.findAll({order:[['createdAt','DESC']]});
        if (products.length > 0) {
            //If products are present in the database
            return res.status(200).json({ success: true, message: 'Products are found', products: products });
        }
        //If products are not present in the database
        return res.status(404).json({ success: false, message: 'Products are not found' });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}

//Deleting a single product from the database
const remove = async (req, res) => {
    try {
        const id = req.params.productId;
        //Verifiyng the received variables 
        if (isStringInvalid(id)) {
            return res.status(400).json({ message: 'productId is missing', success: false });
        }
        const noOfRows = await Product.destroy({ where: { id: id } });
        if (noOfRows === 0) {
            //If product is not present in the database
            return res.status(404).json({ succese: false, message: "Product does not exist in the database" });
        }
        //If product is present in the database
        return res.status(200).json({ succese: true, message: "Product is deleted Successfully from the database" });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}

//Updating a single product to database
const update = async (req, res) => {
    try {
        const { productId, name, description, price } = req.body;
        //Verifiyng the received string variables 
        if (isStringInvalid(name) || isStringInvalid(description)) {
            return res.status(400).json({ message: 'name or description is missing', success: false });
        }
        //Verifiyng the received number variables 
        if (isNumberInvalid(price) || isNumberInvalid(productId)) {
            return res.status(400).json({ message: 'productId or price is missing or productId or price should be a number', success: false });
        }
        // Updating the product in the database
        const edit = await Product.update({ name, description, price }, {
            where: {
                id: productId
            }
        });
        if (edit > 0) {
            //If product is present in the database
            return res.status(201).json({ success: true, message: 'Product has been updated' });
        }
        //If product is not present in the database
        return res.status(404).json({ success: false, message: 'Product has not been found in the database' });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}

module.exports = {
    add,
    get,
    getall,
    remove,
    update
}