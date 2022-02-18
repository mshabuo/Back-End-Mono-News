const db = require("../db/connection")

exports.selectTopic = async () => {
    const data = await db.query('SELECT * FROM topics;')
    // console.log(data)
    return data.rows
}

exports.postComment = async (id, username, body) => {
    if(!username.length && !body.length > 0) {
        return Promise.reject({status:404, msg: 'value or type is not permitted!'})
      } else if (typeof username != 'string' && typeof body != 'string')
      {
          return Promise.reject({status:404, msg: 'value or type is not permitted!'})       
    } else {
    const newComment = await db.query('INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;', [id, username, body])
    return newComment.rows[0]
}
    }


exports.selectArticleById = async (articleId) => {
const articleData = await db.query('SELECT * FROM articles WHERE article_id = $1;', [articleId])
if(articleData.rows.length === 0){
return Promise.reject({status: 404, msg: "article id not found"})
} 
return articleData.rows
}

