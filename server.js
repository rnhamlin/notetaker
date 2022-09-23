const express = require('express');
const fs = require('fs');
const path = require('path')
let notes = require("./db/db.json")
const PORT = process.env.PORT || 80;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
app.get("/api/notes", (req, res) => {
    res.json(notes)
})
app.post("/api/notes", (req, res) => {
    notes.push(req.body)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)
})
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});