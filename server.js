//requirements
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

//port
const PORT = process.env.PORT || 3001;

//JSON
const {notes} = require('./db/db.json');

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));



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