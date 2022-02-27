const { response } = require("express")
const { selectArticleById, updateArticleById, getArticleByQuery, insertCommentByArticleId, insertArticle } = require("../models/articles.model")


const {} = require('../models/articles.model')

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  insertCommentByArticleId(article_id, username, body)
    .then((comment) => {
      return res.status(201).send({ comment });
    })
    .catch((err) => next(err));
};


exports.postArticle = (req, res, next) => {
  const { author, title, body, topic } = req.body;
  insertArticle(author, title, body, topic)
    .then((article) => {
      return res.status(201).send({article: article});
    })
    .catch((err) => next(err));
};

exports.queryArticle = (req, res, next) => {
    const {sort_by, order, topic} = req.query;
getArticleByQuery(sort_by, order, topic).then((articles)=>{
    res.status(200).send({articles})
})
.catch(next)
}

exports.patchArticle = (req, res, next) => {

const {article_id: articleId} = req.params;
const vote = req.body;

updateArticleById(articleId, vote).then((article)=>{

    res.status(201).send({article:article })
})
.catch((err)=> next(err))
}

exports.getArticleById = (req, res, next) =>{
   const {article_id: articleId} = req.params;
selectArticleById(articleId).then((article)=>{
    res.status(200).send({article})
})
.catch((err) => next(err))
}