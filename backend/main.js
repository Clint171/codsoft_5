const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//routers
const productRouter = require("./routers/product.js");
const categoryRouter = require("./routers/category.js");
const orderRouter = require("./routers/order.js");
const reviewRouter = require("./routers/review.js");

dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL , {
    dbName : "ecommerce"
});

const db = mongoose.connection;

db.on("error" , ()=>{
    console.log("Error connecting to database");
});

db.once("open" , ()=>{
    console.log("Database connected successfully");
});

const app = express();


app.use(cors({
    origin : "http://127.0.0.1:5500",
    credentials : false
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/products" , productRouter);
app.use("/api/categories" , categoryRouter);
app.use("/api/orders" , orderRouter);
app.use("/api/reviews" , reviewRouter);

app.use((req , res)=>{
    res.sendStatus(404);
});

app.listen(port , ()=>{
    console.log("App listening on port: "+ port);
});