const { selectTopic, selectArticleById, postComment } = require("../models/ncnews_models")




exports.fetchTopic = (request, response, next) => {
    selectTopic().then((data) => {
    response.status(200).send({data})
})
.catch(next)
}

exports.postCommentByArticleId = (request, response, next) => {
    const id = request.params.article_id
    const {username, body} = request.body
    postComment(id, username, body).then((comment) => {
        response.status(201).send({comment: comment})
    })
    .catch(next)
}

exports.getArticleById = (request, response, next) =>{
   const {article_id: articleId} = request.params;
selectArticleById(articleId).then((article)=>{
    response.status(200).send({article})
})
.catch(next)
}
