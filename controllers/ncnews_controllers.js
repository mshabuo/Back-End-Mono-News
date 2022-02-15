const { selectTopic } = require("../models/ncnews_models")




exports.fetchTopic = (request, response, next) => {
    selectTopic().then((data) => {
    response.status(200).send({data})
})
.catch(next)
}
