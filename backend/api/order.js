const schema = require("../schema/schema.js");

let createOrder = async (req, res) => {
    let order = new schema.Order({
        products: req.body.products,
        amount: 0,
        deliveryStatus: "pending",
        payment: "pending"
    });
    for(let i = 0; i < order.products.length; i++){
        let product = await schema.Product.findById(order.products[i].productId);
        order.amount += product.price * order.products[i].quantity;  
    }
    order.save();
    res.json(order);
}

let checkOut = async (req, res) => {
    let order = await schema.Order.findById(req.params.id);
    if(!order){
        res.sendStatus(404);
    }
    if(!order.products){
        res.sendStatus(400);
    }
    
    //! Not checking for userId for development only
    //todo : Uncomment the below code for production
    // if(!order.userId){
    //     order.userId = req.body.userId;
    // }
    let payment = new schema.Payment({
        userId : order.userId || null, //! Null is for development only
        orderId : order._id,
        amount : order.amount,
        status  : "pending"
    });
    payment.save();
    order.payment = "done";
    order.save();
    res.sendStatus(200);
};

module.exports = {
    createOrder,
    checkOut
};