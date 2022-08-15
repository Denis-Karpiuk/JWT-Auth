const ApiError = require('../exceptions/api-error')
const tokenSevice = require('../services/token-sevice')

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            throw next(ApiError.UnauthorizedError())
        }

        const userData = tokenSevice.validateAccessToken(accessToken)
        if (!userData) {
            throw next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}
