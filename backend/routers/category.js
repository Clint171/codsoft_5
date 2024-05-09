const express = require("express");
const category = require("../api/category.js");

const router = express.Router();

router.get("/", category.getCategories);

module.exports = router;