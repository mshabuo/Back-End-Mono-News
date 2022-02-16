const {fetchTopic} = require("../controllers/ncnews_controllers")
const db = require("../db/connection")

exports.selectTopic = async () => {
    const data = await db.query('SELECT * FROM topics;')
    // console.log(data)
    return data.rows
}

exports.selectArticleById = async (articleId) => {
const articleData = await db.query('SELECT * FROM articles WHERE article_id = $1;', [articleId])
if(articleData.rows.length === 0){
return Promise.reject({status: 404, msg: "article id not found"})
} 
return articleData.rows
}