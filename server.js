//requirements
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

//db
var notes = require('./db/db.json');


//port
const PORT = process.env.PORT || 3001;


//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));


//API ROUTING
app.get("/api/notes", function (req, res) {
   res.json(notes);
  });


app.post("/api/notes", (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid()
    }; 
    notes.push(newNote);
    res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
    notes = notes.filter(note => note.id !== req.params.id);
    res.json(notes);
})


//HTML ROUTING 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//listener
app.listen(PORT, () => {
    console.log(`Server is now on port ${PORT}`);
})