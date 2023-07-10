const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const profileSchema = require('./profile');

const isValidEmail = async (email) => {
    return emailValidator.validate(email);
}

const isValidPassword = (password) => {
    let validator = new passwordValidator();
    validator
        .is().max(40)   
        .is().min(8)
        .has().not().spaces()
        .has().uppercase()
        .has().lowercase()
        .has().symbols()
        .has().digits();
    const result = validator.validate(password, { details: true });
    if (result.length === 0) return true;
    throw new Error(result[0].message);
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [isValidEmail, 'email is not valid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: isValidPassword
    },
    profile: {
        type: profileSchema,
        default: {}
    }
})

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
        
    // check if not null
    if (!user) throw Error('email not registered');
    
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw Error('Password is incorrect');

    return user;
}

module.exports = mongoose.model("user", userSchema);