const db = require("../db/connection")



exports.removeCommentById = async (id) => {
    const removedComment = await db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [id])
    return removedComment.rows[0]
}

exports.selectCommentsByArticleId = async (id) => {

    const commentsArr = await db.query('SELECT comments.* FROM comments WHERE article_id = $1;', [id])
    
return commentsArr.rows
}

exports.postComment = async (slug, description) => {
  if (!slug || !description) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  if (typeof slug !== "string" || typeof description !== "string") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  let queryValues = [slug, description];
  let sqlStr = `INSERT INTO topics (slug, description)
                  VALUES (%L, %L) RETURNING *;`;

  return db.query(queryStr,queryValues).then((results) => {
    return results.rows[0];
  });
};