const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

module.exports.retrieveUser = (req, res, next) => {
    const authHeader = req.get('authorization')
    
    if (!authHeader) throw new Error('Authorization header missing');

    // get auth type and token from header
    const [type, token] = authHeader.split(' ')

    // check if token is of Bearer type
    if (type != 'Bearer') throw new Error('Authorization method must be of type Bearer')

    jwt.verify(token, process.env.ACCESS_SECRET, async (err, decoded) => {
        if (err) throw err; // TokenExpiredError
        // gets user
        const user = await User.findById(decoded.id);
        // send in response
        res.user = user;
        next();
    });
}