const express = require("express");
const controller = require("../controllers/authController");

const router = express.Router();

// sign-up
router.post('/sign-up', controller.postSingUp)

module.exports = router;
