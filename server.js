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
});

app.get("/api/notes", (req, res)=>{
    // reads the JSON file
    fs.readFile("db/db.json", "utf8", (err, data)=>{
        //checks for error
        if(err) throw err;
      //parse the JSON file
     res.json(JSON.parse(data))
    });
});

//sets up the API POST route
app.post("/api/notes", (req, res) =>{
    fs.readFile("db/db.json", "utf8", (err, data)=>{
        //check for error
        if(err) throw err;
        //will parse the data and save to a local variable
        var returnedData = JSON.parse(data)
        const newNote = req.body;
        //set up the id
        req.body.id = returnedData.length + 1;
        //push user data into the file
        returnedData.push(newNote)
        //changes JSON into string
        returnedData = JSON.stringify(returnedData);
        //writes a new JSON file
        fs.writeFile("db/db.json", returnedData, "utf8", (err)=>{
            //check for error
            if(err) throw err;
        })
        return res.json(data);
    }) 
});

//sets up the API delete route
app.delete("/api/notes/:id", (req, res)=>{
    //reads the json file
    fs.readFile("db/db.json", "utf8", (err,data)=>{
        //check for error
        if(err) throw err;
        //will parse the data and save to a local variable
        var returnedData = JSON.parse(data);
        //filter deleted notes
        returnedData = returnedData.filter(deleted => parseInt(req.params.id) !== deleted.id)
        //stringify the file
        returnedData = json.stringify(returnedData);
        //writes a new file
        fs.writeFile("db/db.json", returnedData, "utf8", (err)=>{
            //checks for error
            if(err) throw err;
        })
        return res.json(data)
    })
})

//listens
app.listen(PORT, ()=>{
    console.log("listening on PORT" + PORT)
})