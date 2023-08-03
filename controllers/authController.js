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

module.exports.postSingUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });

        res.status(201).json({
            user,
            ...createTokens(user)
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        res.status(200).json({
            user,
            ...createTokens(user)
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}