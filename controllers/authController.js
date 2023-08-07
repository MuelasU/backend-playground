const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../constants")
require("dotenv").config();

const createTokens = (user) => {
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: config.accessTokenTimeout });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: config.refreshTokenTimeout });
    
    return {
        accessToken,
        refreshToken
    };
}

module.exports.postSingUp = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });

        res.status(201).json({
            user,
            ...createTokens(user)
        });
    } catch (err) {
        next(err);
    }
}

module.exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        res.status(200).json({
            user,
            ...createTokens(user)
        });
    } catch (err) {
        next(err);
    }
}

module.exports.refreshToken = (req, res, next) => {
    const authHeader = req.get('authorization');

    if (!authHeader) throw new Error('Authorization header missing');

    // get auth type and token from header
    const [type, token] = authHeader.split(' ');

    // check if token is of Bearer type
    if (type != 'Bearer') throw new Error('Authorization method must be of type Bearer');

    jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
        if (err) {
            next(err);
        } else {
            const user = await User.findById(decoded.id);
        
            res.status(200).json(createTokens(user));
        }
    })
}