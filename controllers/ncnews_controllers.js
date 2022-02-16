const { selectTopic, selectArticleById } = require("../models/ncnews_models")




exports.fetchTopic = (request, response, next) => {
    selectTopic().then((data) => {
    response.status(200).send({data})
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
