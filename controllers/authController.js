const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const handleErrors = (err) => {
    var obj = { email: '', password: '' };
    
    if (err.code === 11000) {
        obj.email = "email already in use";
        return obj;
    }
    if (err.errors.email) obj.email = err.errors.email.message;
    if (err.errors.password) obj.password = err.errors.password.message;
    
    return obj;
};

const maxAge = 60; // in seconds

const createToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

module.exports.postSingUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });

        // create token
        const token = createToken(user);
        // send as cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * maxAge });

        res.status(201).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

module.exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create token
        const token = createToken(user);
        // send as cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * maxAge });

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}