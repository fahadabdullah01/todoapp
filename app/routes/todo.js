var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.post('/todo', (req, res) => {
        // db.push()
        const todoTask = { "title": req.body.todo};
    db.collection('todo').insert(todoTask, (err, result) => {
        if(err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(result.ops[0]);
        }
})
});

    app.get('/todo/all', (req, res) => {
        db.collection("todo").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });

});
    app.get('/todo/:id', (req, res) => {

        const id = req.params.id;
        console.log(id);
    const details = { '_id': new ObjectID(id) };
    db.collection('todo').findOne(details, (err, item) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(item);
}
});
});
    app.delete('/todo/:id', (req, res) => {
        const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    try {
        db.collection('todo').remove(details, (err, item) => {
            if (err) {
                res.writeHead(400);
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    }
    catch (error)
        {
            res.writeHead(400);
            res.send({'error': 'An internal error has occurred'});
        }
});
    app.put('/todo/:id', (req, res) => {
        const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('todo').update(details, note, (err, result) => {
        if (err) {
            res.writeHead(400);
            res.send({'error':'An error has occurred'});
        } else {
            res.send(note);
}
});
});


};