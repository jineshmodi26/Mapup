const User = require('../models/User')
const getError = require('../utils/dbErrorHandle')
const logger = require('../logs/logger')

module.exports = {
    signup: async (req, res) => {
        logger.info(`${req.url} - POST`)
        try {
            const { email, password } = req.body
            const user = User({
                email,
                password
            })
            await user.save()
            const token = await user.generateAuthToken()
            return res.status(200).json({
                email,
                token
            })
        } catch (error) {
            const errMsg = getError(error)
            logger.error('user.controller : ' + errMsg)
            return res.status(400).json({
                error: true,
                message: errMsg.length > 0 ? errMsg : 'Could not create user.'
            })
        }
    },
    login: async (req, res) => {
        logger.info('/login - POST')
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            const token = await user.generateAuthToken()
            return res.status(200).json({
                email,
                token
            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: 'Invalid email or password'
            })
        }
    }
}
