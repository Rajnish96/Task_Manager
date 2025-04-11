const knex = require('../db/config/knex')

exports.createUser = async (userData) => {
    const insertData = {
        userId: userData.email.split('@')[0] + Date.now(),
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
    }
    return await knex('users').insert(insertData)
}

exports.getUserDetails = async (email) => {
    return await knex('users').select('*').where({ email })
}

exports.getUserById = async (userId) => {
    return await knex('users').select('fullName', 'email').where({ userId }).first();
};