const bcrypt = require('bcryptjs');
const users = require('../services/usersServices')
const userToken = require('../utils/userToken')

exports.registerUser = async (req, res) => {
    try {
        const reqBody = { ...req.body }
        const { email, password } = reqBody
        const userDetails = await users.getUserDetails(email)
        if (userDetails?.length) {
            return res.status(409).send({ message: `User already exist` }).end()
        }
        const encryptedPassword = await bcrypt?.hash(password, 10)
        reqBody.password = encryptedPassword
        await users.createUser(reqBody)
        return res.status(201).send({ message: `Registered Successfully` }).end()
    } catch (err) {
        const status = err.status || 500
        const message = err.sqlMessage || err.message || 'Internal Server Error'
        return res.status(status).send({ message }).end()
    }
}

exports.loginUser = async (req, res) => {
    try {
        const reqBody = { ...req.body }
        const userDetails = await users.getUserDetails(reqBody.email)
        if (!userDetails?.length) {
            return res.status(401).send({ message: `Invalid Credentials` }).end()
        }
        const { password, ...userWithoutPassword } = userDetails[0]
        const isPasswordValid = await bcrypt?.compare(reqBody.password, password)
        if (!isPasswordValid) {
            return res.status(401).send({ message: `Invalid Credentials` }).end()
        }
        const token = userToken.createUserToken(userWithoutPassword)
        return res.status(200).send({ message: `Login Successfully`, token, user: userWithoutPassword }).end()
    } catch (err) {
        const status = err.status || 500
        const message = err.sqlMessage || err.message || 'Internal Server Error'
        return res.status(status).send({ message }).end()
    }
}