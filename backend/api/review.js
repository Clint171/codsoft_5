const schema = require("../schema/schema.js");

let createReview = (req, res) => {
    let review = new schema.Review({
        userId: req.user._id,
        productId: req.body.productId,
        review: req.body.review,
        rating: req.body.rating
    });
    review.save();
    res.json(review);
}

let getProductReviews = (req, res) => {
    schema.Review.find({productId : req.params.productId}, (err, reviews) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(reviews);
    });
}

module.exports = {
    createReview,
    getProductReviews
}