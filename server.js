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
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//API CALLS
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        if (err) throw err;
        let noteList = JSON.parse(data)
        res.send(noteList);
    })
});

app.post('/api/notes', (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    newNote.id = uniqid();
    
    noteList.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));

    res.json(noteList);
});

app.delete('/api/notes/:id', (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let deleteNoteID = req.params.id;

    let newList = noteList.filter(note => note.id != deleteNoteID);

    fs.writeFileSync("./db/db.json", JSON.stringify(newList));
    res.json(newList);

})

//HTML ROUTING 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
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