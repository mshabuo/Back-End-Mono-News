const {fetchTopic} = require("../controllers/ncnews_controllers")
const db = require("../db/connection")

exports.selectTopic = async () => {

    const data = await db.query('SELECT * FROM topics;')
    // console.log(data)
    return data.rows
    
}