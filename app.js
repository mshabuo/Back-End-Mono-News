const cors = require ('cors');
const express = require ('express');
const app = express();
app.use(cors());
const {getArticleById, patchArticle, queryArticle, postArticle} = require("./controllers/articles.controller")
const {deleteComment, postCommentByArticleId, fetchCommentsByArticleId} = require("./controllers/comments.controller")
const {fetchTopic} = require("./controllers/topics.controller")
const {fetchUsers} = require("./controllers/users.controllers")
const {errorHandler400, errorCustomerHandler, handlePsqlErrors } = require('./errors')

app.use(express.json());

app.get('/api/topics', fetchTopic)
app.get('/api/articles/:article_id', getArticleById)
app.patch('/api/articles/:article_id', patchArticle)
app.get('/api/users', fetchUsers)
app.get('/api/articles/:article_id/comments', fetchCommentsByArticleId)
app.get('/api/articles', queryArticle)
app.delete('/api/comments/:comment_id', deleteComment)
app.post('/api/articles/:article_id/comments', postCommentByArticleId)
app.post('/api/articles', postArticle)

app.all("/*", (req, res)=>{
    res.status(404).send({msg: 'opps, path not found'})
})
app.use(errorHandler400);
app.use(errorCustomerHandler);
app.use(handlePsqlErrors);


module.exports = app;

