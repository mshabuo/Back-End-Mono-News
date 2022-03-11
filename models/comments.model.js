const db = require("../db/connection")



exports.removeCommentById = async (id) => {
    const removedComment = await db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [id])
    return removedComment.rows[0]
}

exports.selectCommentsByArticleId = async (id) => {

    const commentsArr = await db.query('SELECT comments.* FROM comments WHERE article_id = $1;', [id])
    
return commentsArr.rows
}
exports.postComment = async (article_id, reqBody) => {
  const username = reqBody.username;
  const body = reqBody.body;
 
    const newComment = await  db.query(
      'INSERT INTO comments (author,body,article_id) VALUES($1,$2,$3) RETURNING *;',[username, body, article_id]
    )
    console.log(newComment.rows[0])
  return newComment.rows[0]
};

