const db = require("../db/connection")



exports.insertArticle = async (author, title, body, topic) => {
  if (!author || !title || !body || !topic) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  if (
    typeof author !== "string" ||
    typeof title !== "string" ||
    typeof body !== "string" ||
    typeof topic !== "string"
  ) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
const queryData = await db.query(`INSERT INTO articles (author, title, body, topic)
                VALUES ($1, $2, $3, $4) RETURNING *;`, [author, title, body, topic])
return queryData.rows[0]
};

exports.insertCommentByArticleId = (article_id, username, body) => {
  if (!username || !body) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  if (typeof username !== "string" || typeof body !== "string") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  let queryValues = [article_id, username, body];
  let sqlStr = `INSERT INTO comments (article_id, author, body)
                VALUES (%L, %L, %L) RETURNING *;`;

  const queryStr = format(sqlStr, queryValues);

  return db.query(queryStr).then((results) => {
    console.log("problem",results.rows[0])
    return results.rows[0];
  });
};

exports.getArticleByQuery = (sort_by = "created_at", order = "desc", topic) => {
  const queryValues = []
  let validColumns = [
    "title",
    "topic",
    "article_id",
    "author",
    "body",
    "created_at",
    "votes",
  ];

  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: 'Invalid sort query' });
  }

  if (!['asc', 'desc'].includes(order)) {
    return Promise.reject({ status: 400, msg: 'Invalid order query' });
  }
  let topicQuery = "";

  if (topic) {
    topicQuery = `WHERE articles.topic = $1`;
    queryValues.push(topic)
  }
  return db
    .query(
      `SELECT articles.*, COUNT(comment_id)::INT AS comment_count FROM articles
  LEFT JOIN comments
  ON comments.article_id = articles.article_id ${topicQuery} GROUP BY articles.article_id
  ORDER BY ${sort_by} ${order};`,queryValues)

    .then(({ rows }) => {
      if (rows.length < 1) {
        return Promise.reject({ status: 404, msg: `Topic not found` });
      }
      return rows;
}
)}

exports.updateArticleById = async (articleId, vote) => {
    const voteVal = vote.votes;
if (voteVal === 0) {
    Promise.reject({status:400, msg: 'no value specified'})
}
    const updatedArticle = await db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;', [voteVal, articleId])
    return updatedArticle.rows[0]
    }

    exports.selectArticleById = async (articleId) => {
const articleData = await db.query('SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;', [articleId])
if(articleData.rows.length === 0){
return Promise.reject({status: 404, msg: "article id not found"})
} 
return articleData.rows
}
