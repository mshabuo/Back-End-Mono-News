const { selectTopic } = require("../models/topics.controller")

exports.fetchTopic = (req, res, next) => {
  selectTopic()
    .then(data => {
      res.status(200).send({ data })
    })
    .catch(err => next(err))
}
