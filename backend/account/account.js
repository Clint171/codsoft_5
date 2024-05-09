const schema = require("..schema/schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let createAccount = (req, res) => {
    let user = new schema.User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json(err);
        }
        user.password = hash;  
    });
    user.save();
    res.json(user);
}

let login = (req, res) => {
    schema.User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            res.status(500).json(err);
        }
        if (!user) {
            res.status(404).json("User not found");
        }
        bcrypt.compare(req.body.password, user.password, async (err, result) => {
            if (err) {
                res.status(500).json(err);
            }
            if (!result) {
                res.status(401).json("Invalid password");
            }
            let token = await jwt.sign(user , process.env.JWT_SECRET);
            
            res.cookie("token" , token , {
                maxAge: 1000  * 60 * 60
            }).json(user);
        });
    });
}

let authenticate = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        res.status(401).json("Unauthorized");
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(401).json("Unauthorized");
            return;
        }
        req.user = user;
        next();
    });
}

let getAccount = (req, res) => {
    schema.User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        user.password = null;
        res.json(user);
    });
}

let updateAccount = (req, res) => {
    schema.User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.save();
        res.json(user);
    });
}

let deleteAccount = (req, res) => {
    schema.User.findByIdAndDelete(req.params.id, (err, user) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(user);
    });
}

module.exports = {
    createAccount,
    login,
    authenticate,
    getAccount,
    updateAccount,
    deleteAccount
}