const express = require("express");
const Player = require("../models/example");

const router = express.Router();

router.post('/', async (req, res) => {
    const player = new Player({
        name: req.body.name,
        club: req.body.club,
        position: req.body.position
    })
    
    try {
        const data = await player.save();
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({message: error.message});
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Player.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.delete('/', (req, res) => {
    res.send('Delete')
})

module.exports = router;