const schema = require("../schema/schema.js");

let getCategories = async (req, res) => {
    let categories = await schema.Category.find().populate("products");
    res.json(categories);
}

module.exports = {
    getCategories
}