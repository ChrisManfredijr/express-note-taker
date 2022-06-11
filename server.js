//requirements
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');


//port
const PORT = process.env.PORT || 3001;


//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));


//API ROUTING
app.get("/api/notes", function (req, res) {
    fs.readFileSync("./db/db.json", "utf8", function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      res.json(data);
    });
  });


app.post("/api/notes", (req, res) => {
    var newNote = req.body;
    var noteArray = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    newNote.id = uniqid();
    noteArray.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(noteArray));
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