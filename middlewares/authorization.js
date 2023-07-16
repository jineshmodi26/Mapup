const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
    checkUser: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const data = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findOne({ _id: data._id })
            if (!user) {
                return res.status(403).json({
                    error: true,
                    message: 'Unauthorized'
                })
            } else {
                next()
            }
        } catch (error) {
            return res.status(403).json({
                error: true,
                message: 'Unauthorized'
            })
        }
    }
}
