const express = require("express");
const controller = require("../controllers/authController");

const router = express.Router();

router.post('/sign-up', controller.postSingUp);
router.post('/login', controller.postLogin);
router.post('/refresh', controller.refreshToken);

module.exports = router;
