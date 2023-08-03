const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../constants");
require("dotenv").config();

module.exports.refreshToken = (req, res, next) => {
    const authHeader = req.get('authorization');

    if (!authHeader) throw new Error('Authorization header missing');

    // get auth type and token from header
    const [type, token] = authHeader.split(' ');

    // check if token is of Bearer type
    if (type != 'Bearer') throw new Error('Authorization method must be of type Bearer');

    jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
        if (err) next(err);

        const user = await User.findById(decoded.id);

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: config.accessTokenTimeout });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: config.refreshTokenTimeout });
    
        res.status(200).json({
            accessToken,
            refreshToken
        });
    })
}