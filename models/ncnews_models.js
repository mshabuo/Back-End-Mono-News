const db = require("../db/connection")
const format = require('pg-format')

exports.selectTopic = async () => {
    const data = await db.query('SELECT * FROM topics;')
    return data.rows
}

exports.selectArticleById = async (articleId) => {
const articleData = await db.query('SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;', [articleId])
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


exports.selectCommentsByArticleId = async (id) => {

    const commentsArr = await db.query('SELECT comments.* FROM comments WHERE article_id = $1;', [id])
    
return commentsArr.rows
}


