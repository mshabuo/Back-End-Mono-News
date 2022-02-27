const { response } = require("express")
const { selectUsers } = require("../models/users.model")

exports.fetchUsers = (req, res, next) => {
selectUsers().then((users)=>{
    res.status(200).send({users})
})
.catch((err) => next(err))
}