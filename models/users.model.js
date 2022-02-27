const db = require("../db/connection")


exports.selectUsers = async () => {
    const usersArr = await db.query('SELECT * FROM users;')
    return usersArr.rows
}