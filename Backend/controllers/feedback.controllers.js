const Feedback = require('../models/feedback.model')

// create feedback
exports.createFeedback = async(req, res) => {
    const {productId, title, description} = req.body

    if(!title || !description){
        return res.status(400).json({
            success: false,
            message: 'title and description required'
        })
    }

    const feedback = await Feedback.create({productId, title, description, user: req.user.id})

    // response
    res.status(201).json({
        success: true,
        message: "Feedback created",
        feedback
    })
}

// get all feedback
exports.allFeedbacks = async(req, res) => {
    const allFeedback = await Feedback.find().populate('user', 'name')
    
    res.status(200).json({
        success: true,
        message: "found all feedback",
        allFeedback
    })
}


// get feedback by id
exports.userFeedbacks = async(req, res) => {
    const userFeedback = await Feedback.find({user: req.user.id}).populate('user', 'name')

    res.status(200).json({
        success: true,
        message: "found user feedback",
        userFeedback
    })
}

// update feedback by id
exports.updateFeedback = async(req, res) => {
    const {productId ,title, description} = req.body
    const updated = await Feedback.findByIdAndUpdate(req.params.id, {productId ,title, description})

    res.status(200).json({
        success: true,
        message: 'feedback updated',
        updated
    })
}

// delete feedback by id
exports.deleteFeedback = async(req, res) => {
    await Feedback.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        message: 'feedback deleted'
    })
}

// delete all feedbacks of user
exports.deleteAllFeedbacksOfUser = async(req, res) => {
    await Feedback.deleteMany({user: req.user.id})
    res.status(200).json({
        success: true,
        message: "user's all feedback deleted"
    })
}
