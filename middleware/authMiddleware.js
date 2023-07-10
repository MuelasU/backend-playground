const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

module.exports.retrieveUser = (req, res, next) => {
    const { token } = req.cookies;
    
    if (!token) throw new Error('Token is expired');

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) throw err;
        const user = await User.findById(decoded.id);
        res.user = user;
        next();
    });
}