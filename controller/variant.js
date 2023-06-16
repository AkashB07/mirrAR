// Models
const Variant = require('../model/variant');

//To verify the string variable
function isStringInvalid(string) {
    if (string == undefined || string.length === 0) {
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

//Adding a single variant to database
const add = async (req, res) => {
    try {
        const { name, sku, price, count, productId } = req.body;
        //Verifiyng the received string variables 
        if (isStringInvalid(name) || isStringInvalid(sku)) {
            return res.status(400).json({ message: 'name or price is missing', success: false });
        }
        //Verifiyng the received number variables 
        if (isNumberInvalid(price) || isNumberInvalid(count)) {
            return res.status(400).json({ message: 'price, count or productId is missing or price, count or productId should be a number', success: false });
        }

        //Finding the additional cost
        const additionalCost = price - req.product.price;

        // Storing the variant in the database
        await Variant.create({ name, sku, additionalCost, count, productId });
        return res.status(201).json({ success: true, message: 'Variant has been added' });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}

//Deleting a single variant from the database
const remove = async (req, res) => {
    try {
        const id = req.params.variantId;
        //Verifiyng the received variables 
        if (isStringInvalid(id)) {
            return res.status(400).json({ message: 'variantId is missing', success: false });
        }
        const noOfRows = await Variant.destroy({ where: { id: id } });
        if (noOfRows === 0) {
            //If variant is not present in the database
            return res.status(404).json({ succese: false, message: "Variant does not exist in the database" });
        }
        //If variant is present in the database
        return res.status(200).json({ succese: true, message: "Variant is deleted Successfully from the database" });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}

//Updating a single variant to database
const update = async (req, res) => {
    try {
        const { variantId, name, sku, price, count, productId } = req.body;
        //Verifiyng the received string variables 
        if (isStringInvalid(name) || isStringInvalid(sku)) {
            return res.status(400).json({ message: 'name or price is missing', success: false });
        }
        //Verifiyng the received number variables 
        if (isNumberInvalid(variantId) || isNumberInvalid(price) || isNumberInvalid(count)) {
            return res.status(400).json({ message: 'variantId, price, count or productId is missing or variantId, price, count or productId should be a number', success: false });
        }

        //Finding the additional cost
        const additionalCost = price - req.product.price;
        // Updating the variant in the database
        const edit = await Variant.update({ name, sku, additionalCost, count, productId }, {
            where: {
                id: variantId
            }
        });
        if (edit > 0) {
            //If variant is present in the database
            return res.status(201).json({ success: true, message: 'Variant has been updated' });
        }
        //If variant is not present in the database
        return res.status(404).json({ success: false, message: 'Variant has not been found in the database' });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}

module.exports = {
    add,
    remove,
    update
}