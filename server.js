// these are my variables that i will call on
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
var app = express();
var PORT = process.env.PORT || 3001;

// this tells express how to handle the data
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// this tells the page what to open on the initial load
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// this tells the page what to open on the initial load on the notes url
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


// this is the api request for the notes
app.get('/api/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// this is to post the note onto the list and giving its id
app.post('/api/notes', function (req, res) {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json"));
    let notelength = (noteList.length).toString();
    newNote.id = notelength;
    noteList.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

// this deletes any list item based off its id
app.delete('/api/notes/:id', function (req, res) {
    let noteList = JSON.parse(fs.readFileSync('./db/db.json'));
    let noteId = (req.params.id).toString();
    noteList = noteList.filter(function (selected) {
        return selected.id != noteId;
    })
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

// this listens for the port being called on local host
app.listen(PORT, function () {
    console.log('http://localhost:3001/');
});