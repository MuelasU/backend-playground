const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    team: String,
    nationalTeam: String
})

module.exports = profileSchema;