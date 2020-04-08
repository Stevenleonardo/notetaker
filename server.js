//require proper modules
const express = require("express")
const path = require("path")
const fs = require("fs")

//set express to a easily reachable variable
const app = express()

//set up port
var PORT = process.env.PORT || 8080;

//set up express
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//sets up API get routes

//will return notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
//Will return index.html
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));

app.get("/api/notes", (req, res)=>{
    // reads the JSON file
    fs.readFile("db/db.json", "utf8", (err, data)=>{
        //checks for error
        if(err) throw err;

    //parse the JSON file
    res.json(JSON.parse(data))
    });
});