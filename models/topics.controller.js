const db = require("../db/connection")
const format = require('pg-format')


exports.selectTopic = async () => {
    const data = await db.query('SELECT * FROM topics;')
    return data.rows
}