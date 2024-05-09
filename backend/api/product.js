const schema = require("../schema/schema");

let createProduct = async (req, res) => {
    let product = new schema.Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image
    });
    product.save();
    let category = await schema.Category.findOne({name: req.body.category});
    if(category){
        category.products.push(product._id);
        category.save();
    }
    else{
        category = new schema.Category({
            name: req.body.category,
            products: [product._id]
        });
        category.save();
    }
    res.json(product);
}

let getProducts = async (req, res) => {
    let products = await schema.Product.find();
    res.json(products);
}

let getProduct = async (req, res) => {
    let product = await schema.Product.findById(req.params.id);
    res.json(product);
}

let updateProduct = async (req, res) => {
    let product = await schema.Product.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.save();
    res.json(product);
}

let deleteProduct = async (req, res) => {
    let product = await schema.Product.findByIdAndDelete(req.params.id);
    res.sendStatus(200)
}

let searchProducts = async (req, res) => {
    let products = await schema.Product.find({name: new RegExp(req.params.name, "i")});
    res.json(products);
}

let getProductsByPrice = async (req , res) => {
    let products = await schema.Product.find({}).sort({price : req.params.price});
    res.json(products);
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByPrice
}