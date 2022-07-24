const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
var app = express();
var PORT = process.env.PORT || 3001;


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.route('/api/notes')

app.get('/api/notes', function (req, res) {
    res.json(db);
})

app.post('/api/notes', function (req, res) {
    let newNote = req.body;
    db.push(newNote)
    fs.writeFile('db/db.json', JSON.stringify(db), function (err) {
        if(err) {
            console.log(err);
        }
        console.log("Your Note Was Added")
    })
})


app.listen(PORT, function () {
    console.log('App waiting on port-' + PORT);
});