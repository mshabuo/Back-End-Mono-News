const {fetchTopic, patchArticle} = require("../controllers/ncnews_controllers")
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


exports.updateArticleById = async (articleId, vote) => {
    const voteVal = vote.votes;
if (voteVal === 0) {
    Promise.reject({status:400, msg: 'no value specified'})
}
    const updatedArticle = await db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;', [voteVal, articleId])
    return updatedArticle.rows[0]
    }

exports.selectUsers = async () => {
    const usersArr = await db.query('SELECT * FROM users;')
    return usersArr.rows
}

