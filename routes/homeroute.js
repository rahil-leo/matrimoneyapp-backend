const express = require('express')
const router = express.Router()

const { personal, getHome, editProfilePicture, editProfile, postEditProfile, getMatches } = require('../controllers/homecontroller')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getHome)
router.post('/editprofilepicture',protect, editProfilePicture)
router.post('/personal', protect, personal)
router.get('/editprofile', protect, editProfile)
router.post('/posteditProfile', protect, postEditProfile)
router.get('/matches', protect, getMatches)


module.exports = router