exports.errorHandler400 = (err, req, res, next) =>{
    if (err.code === '22P02') {
        res.status(400).send({msg: 'bad request'})
    } else next(err)
}

exports.errorCustomerHandler = (err, req, res, next) => {
    if(err.status) {
       return res.status(err.status).send({msg: err.msg})
    }
}