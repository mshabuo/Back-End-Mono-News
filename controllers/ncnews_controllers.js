const { selectTopic, selectArticleById, updateArticleById, selectUsers } = require("../models/ncnews_models")


exports.fetchUsers = (request, response, next) => {
selectUsers().then((users)=>{
    response.status(200).send({users})
})
.catch(next)
}
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

exports.patchArticle = (request, response, next) => {
// access user articleId and request body
const {article_id: articleId} = request.params;
const vote = request.body;
// invoke model function with articleId and requestBody
updateArticleById(articleId, vote).then((article)=>{
//respond back to client with updated article 
    response.status(201).send({article:article })
})
.catch(next)
}



