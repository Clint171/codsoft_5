const express = require("express");
const review = require("../api/review.js");

const router = express.Router();

router.post("/", review.createReview);

router.get("/:productId", review.getProductReviews);

module.exports = router;