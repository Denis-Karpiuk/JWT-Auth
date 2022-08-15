const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-sevice')
const tokenService = require('./token-sevice')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

// services for user
class UserService {
    async registration(email, password) {
        const condidate = await UserModel.findOne({ email })
        if (condidate) {
            throw ApiError.BadRequest(`Пользователь с такой почтой ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await UserModel.create({ email, password: hashPassword, activationLink })
        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        )

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Пользователь с такой почтой уже существует')
        }
        user.isActivated = true
        await user.save()
    }
}

module.exports = new UserService()
