const { response } = require("express")
const {removeCommentById, selectCommentsByArticleId, postComment} = require("../models/comments.model")


exports.deleteComment = (req, res, next) => {
  const {comment_id: id} = req.params
  removeCommentById(id).then((comment)=>{
res.status(204).send({deleted: comment})
  })
  .catch((err)=>{
    next(err)
  })
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

exports.postCommentByArticleId = (req, response, next) => {
  const { slug, description } = request.body;
  postComment(slug, description)
    .then((topic) => {
      return res.status(201).send({ topic });
    })
    .catch((err) => next(err));
};