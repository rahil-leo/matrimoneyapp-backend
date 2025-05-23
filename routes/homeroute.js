const express = require('express')
const router = express.Router()

const { personal, getHome, editProfilePicture, editProfile, postEditProfile, getMatches, requestMatches, postEditProfessional, getReceivedRequests, checkaccepted } = require('../controllers/homecontroller')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getHome)
router.post('/editprofilepicture',protect, editProfilePicture)
router.post('/personal', protect, personal)
router.get('/editprofile', protect, editProfile)
router.post('/posteditProfile', protect, postEditProfile)
router.post('/posteditprofessional',protect,postEditProfessional)
router.get('/matches', protect, getMatches)
router.post('/requestsmatches', protect, requestMatches)
router.get('/receivedrequests', protect, getReceivedRequests)
router.post('/checkaccepted', protect,checkaccepted)


module.exports = router