const express = require ('express');
const app = express();
const {fetchTopic, getArticleById, patchArticle, fetchUsers} = require("./controllers/ncnews_controllers")
const {errorHandler400, errorCustomerHandler } = require('./errors')
app.use(express.json());

app.get('/api/topics', fetchTopic)
app.get('/api/articles/:article_id', getArticleById)
app.patch('/api/articles/:article_id', patchArticle)
app.get('/api/users', fetchUsers)

app.all("/*", (req, res)=>{
    res.status(404).send({msg: 'opps, path not found'})
})
app.use(errorHandler400);
app.use(errorCustomerHandler);


module.exports = app;

