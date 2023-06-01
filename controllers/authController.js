const User = require("../models/user");

const handleErrors = (err) => {
    var obj = { email: '', password: '' };
    if (err.errors.email) obj.email = err.errors.email.message;
    if (err.errors.password) obj.password = err.errors.password.message;
    return obj;
};

module.exports.postSingUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}