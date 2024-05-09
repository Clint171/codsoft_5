const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : String,
    description : String,
    price : Number,
    image : String
});

const Product = mongoose.model("Product" , productSchema);

const categorySchema = new mongoose.Schema({
    name : String,
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    }]
});

const Category = mongoose.model("Category" , categorySchema);

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

const User = mongoose.model("User" , userSchema);

const orderSchema = new mongoose.Schema({
    userId : String,
    products : [{
        productId : String,
        quantity : Number
    }],
    amount : Number,
    deliveryStatus : {
        type : String,
        default : "pending",
        enum : ["pending" , "shipped"]
    },

    payment : {
        type : String,
        default : "pending",
        enum : ["pending" , "done"]
    }
});

const Order = mongoose.model("Order" , orderSchema);

const paymentSchema = new mongoose.Schema({
    userId : String,
    orderId : String,
    amount : Number,
    status : {
        type : String,
        default : "pending",
        enum : ["pending" , "done"]
    },
    date : {
        type : Date,
        default : Date.now
    }
});

const Payment = mongoose.model("Payment" , paymentSchema);

const reviewSchema = new mongoose.Schema({
    userId : String,
    productId : String,
    review : String,
    rating : Number
});

const Review = mongoose.model("Review" , reviewSchema);

//Mock data

// let product1 = new Product({
//     name : "Iphone 12",
//     description : "Apple Iphone 12",
//     price : 80000,
//     image : "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg"
// });

// product1.save();

// let product2 = new Product({
//     name : "Samsung Galaxy S21",
//     description : "Samsung Galaxy S21",
//     price : 70000,
//     image : "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/28/9399121/1.jpg?7761"
// });

// product2.save();

// let product3 = new Product({
//     name : "One Plus 9",
//     description : "One Plus 9",
//     price : 60000,
//     image : "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/75/508566/1.jpg?5825"
// });

// product3.save();

// let category1 = new Category({
//     name : "Mobiles",
//     products : [product1._id , product2._id , product3._id]
// });

// category1.save();

// let user1 = new User({
//     name : "John",
//     email : "john@email.com",
//     password : "john123"
// });

// user1.save();

// let user2 = new User({
//     name : "Jane",
//     email : "jane@email.com",
//     password : "jane123"
// });

// user2.save();

// let order1 = new Order({
//     userId : user1._id,
//     products : [
//         {
//             productId : product1._id,
//             quantity : 2
//         },
//         {
//             productId : product2._id,
//             quantity : 1
//         }
//     ],
//     amount : 230000
// });

// order1.save();

// let order2 = new Order({
//     userId : user2._id,
//     products : [
//         {
//             productId : product3._id,
//             quantity : 1
//         }
//     ],
//     amount : 60000
// });

// order2.save();

// let review1 = new Review({
//     userId : user1._id,
//     productId : product1._id,
//     review : "Good product",
//     rating : 4
// });

// review1.save();

// let review2 = new Review({
//     userId : user2._id,
//     productId : product2._id,
//     review : "Great product",
//     rating : 5
// });

// review2.save();

// let review3 = new Review({
//     userId : user1._id,
//     productId : product3._id,
//     review : "Nice product",
//     rating : 4
// });

// review3.save();

module.exports = {
    Product,
    User,
    Order,
    Review,
    Category,
    Payment
}