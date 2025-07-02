const User = require('../models/user.models')

// get user
exports.getUser = async(req, res) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        message: 'found user data',
        user
    })
}

// update user
exports.updateUser = async(req, res) => {
    const user = await User.findByIdAndUpdate(req.user.id, req.body)

    res.status(200).json({
        success: true,
        message: 'updated user successfully',
        user
    })
}

// delete user
exports.deleteUser = async(req, res) => {
    await User.findByIdAndDelete(req.user.id)

    res.status(200).json({
        success: true,
        message: 'user deleted successfully'
    })
}
