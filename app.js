//Require express, body-parser, method-override and mongoose
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose");

//Use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//Use methodOverride
app.use(methodOverride("_method"));

//Tell app to use the public directory to hold assets
app.use(express.static("public"));

//Set the view directory to be in ejs format
app.set("view engine", "ejs");

//Connect mongoose to mongodb
mongoose.connect("mongodb://localhost/coding_blog");




//Tell the server to listen for requests
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started..");
});
