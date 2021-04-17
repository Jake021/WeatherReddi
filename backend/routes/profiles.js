const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profiles');

router.post('', ProfileController.createProfile);
router.put('/:id', ProfileController.updateProfile);
router.get('', ProfileController.getProfiles);
router.get('/:id', ProfileController.getProfile);
router.delete('/:id', ProfileController.deleteProfile);

module.exports = router;