const { Router } = require("express");
const { refreshToken } = require("../controllers/refreshController");

const router = Router();
const path = '/refresh';

router.post(path, refreshToken);

module.exports = router;