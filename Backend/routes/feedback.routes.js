const express = require('express')
const router = express.Router()
const feedbackController = require('../controllers/feedback.controllers')
const auth = require('../middleware/auth.middleware')

router.post('/create-feedback',auth, feedbackController.createFeedback)

router.get('/all-feedbacks',auth,feedbackController.allFeedbacks)
router.get('/user-feedbacks',auth,feedbackController.userFeedbacks)

router.put('/update-feedback/:id',auth,feedbackController.updateFeedback)

router.delete('/delete-feedback/:id',auth,feedbackController.deleteFeedback)
router.delete('/delete-All-Feedbacks-Of-User',auth,feedbackController.deleteAllFeedbacksOfUser)


module.exports = router