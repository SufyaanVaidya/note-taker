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



app.get('/api/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.post('/api/notes', function (req, res) {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let notelength = (noteList.length).toString();
    newNote.id = notelength;
    noteList.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});




app.listen(PORT, function () {
    console.log('http://localhost:3001/');
});