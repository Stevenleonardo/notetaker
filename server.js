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
app.use(express.json()):
app.use(express.static("public"));