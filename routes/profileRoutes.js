const { Router } = require("express");
const { retrieveUser } = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/profileController");

const router = Router();
const path = '/profile';

router.get(path, retrieveUser, getProfile);
router.put(path, retrieveUser, updateProfile);

module.exports = router;