const express = require ('express');
const app = express();
const {fetchTopic} = require("./controllers/ncnews_controllers")


app.get('/api/topics', fetchTopic)
app.get('/api/topicss')

app.all("/*", (req, res)=>{
    res.status(404).send({msg: 'opps, path not found'})
})

module.exports = app;

