const JSONendpoints = require("../endpoints.json")

exports.fetchJSON = (req, res, next) => {
    res.status(200).send(JSONendpoints)
};