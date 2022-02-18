const { response } = require("express")
const { selectTopic, selectArticleById, updateArticleById, selectUsers, getArticleByQuery, selectCommentsByArticleId } = require("../models/ncnews_models")


exports.fetchUsers = (request, response, next) => {
selectUsers().then((users)=>{
    response.status(200).send({users})
})
.catch((err) => next(err))
}
exports.fetchTopic = (request, response, next) => {
    selectTopic().then((data) => {
    response.status(200).send({data})
})
.catch((err) => next(err))
}

exports.getArticleById = (request, response, next) =>{
   const {article_id: articleId} = request.params;
selectArticleById(articleId).then((article)=>{
    response.status(200).send({article})
})
.catch((err) => next(err))
}

exports.patchArticle = (request, response, next) => {

const {article_id: articleId} = request.params;
const vote = request.body;

updateArticleById(articleId, vote).then((article)=>{

    response.status(201).send({article:article })
})
.catch((err)=> next(err))
}

exports.fetchCommentsByArticleId = (req, res, next) => {
  const id = req.params.article_id;
  selectCommentsByArticleId(id)
    .then((comments) => {
      if (comments.length > 0) {
        res.status(200).send(comments);
      } else {
        return Promise.reject({ status: 404, msg: "comments not found" });
      }
    })
    .catch((err) => next(err));
};




