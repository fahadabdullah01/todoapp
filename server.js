const http = require('http');
const express = require('express');
const app = express();
const MongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser');
const db             = require('./config/db');
const port = 8080;
var todoData=[];
app.use(bodyParser.json({extended:true}));
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    var database = database.db("todo_tpearls")
    require('./app/routes')(app, database);

app.listen(port, () => {
    console.log('live on' + port);
});
})
