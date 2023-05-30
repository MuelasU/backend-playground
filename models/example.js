const mongoose = require("mongoose");

const positions = ["GK", "CB", "RB", "LB", "CAM", "CDM", "RW", "LW", "ST"];

const playerSchema = new mongoose.Schema({
    name: String,
    club: String,
    position: {
        type: String, 
        enum: positions
    }
});

module.exports = mongoose.model('Player', playerSchema);