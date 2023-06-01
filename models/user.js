const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

const isValidEmail = async (email) => {
    return emailValidator.validate(email);
}

const isValidPassword = (password) => {
    let validator = new passwordValidator();
    validator
        .is().min(8)
        .is().max(40)
        .has().not().spaces()
        .has().uppercase()
        .has().lowercase()
        .has().symbols()
        .has().digits();
    const result = validator.validate(password, { details: true });
    if (result.length === 0) return true;
    throw new Error(result[0].message);
}

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [isValidEmail, 'email is not valid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: isValidPassword
    }
})

module.exports = mongoose.model("user", userSchema);