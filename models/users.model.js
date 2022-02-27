const db = require("../db/connection")
const format = require('pg-format')

exports.selectUsers = async () => {
    const usersArr = await db.query('SELECT * FROM users;')
    return usersArr.rows
}