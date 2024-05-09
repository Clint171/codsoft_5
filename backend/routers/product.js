const express = require("express");
const product = require("../api/product.js");

const router = express.Router();

router.get("/", product.getProducts);
router.get("/:id", product.getProduct);
router.post("/", product.createProduct);
router.put("/:id", product.updateProduct);
router.delete("/:id", product.deleteProduct);
router.get("/search/:name", product.searchProducts);
router.get("/price/:price", product.getProductsByPrice);

router.use((req , res)=>{
    res.sendStatus(404);
});

module.exports = router;