const User = require("../models/user");

module.exports.getProfile = (req, res) => {
    res.status(200).json(res.user.profile);
}

module.exports.updateProfile = async (req, res) => {
    res.user.profile = req.body

    try {
        const updated = await User.updateOne({_id: res.user._id}, res.user);
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}