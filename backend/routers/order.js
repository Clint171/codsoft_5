const express = require("express");
const order = require("../api/order.js");

const router = express.Router();

router.post("/createOrder" , order.createOrder);
router.post("/checkOut/:id" , order.checkOut);

module.exports = router;