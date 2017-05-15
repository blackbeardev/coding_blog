//=======================================================================
// CONFIG
//=======================================================================

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

//Create a posts schema
var postsSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    created: {type: Date, default: Date.now}
});

//Compile the postsSchema into a post model
var Post = mongoose.model("Post", postsSchema);

//Add a post to test
// Post.create({
//     title: "Test post",
//     image: "https://www.playosmo.com/images/games/coding/9a27a73.logo-coding.png",
//     content: "This is the content for the first test post."
// }, function(err, newlyCreated) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(newlyCreated);
//     }
// });





//=======================================================================
// ROUTES
//=======================================================================

app.get("/", function(req, res) {
    res.redirect("/posts");
});

//INDEX route
app.get("/posts", function(req, res) {
    Post.find({}, function(err, allPosts) {
        if(err) {
            console.log(err);
        } else {
            res.render("posts", {posts: allPosts});
        }
    });
});

//NEW route
app.get("/posts/new", function(req, res) {
    res.render("new");
});

//CREATE route
app.post("/posts", function(req, res) {
    var title = req.body.title;
    var image = req.body.image;
    var content = req.body.content;
    var newPost = {title: title, image: image, content: content};
    Post.create(newPost, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/posts");
        }
    });
});

//SHOW route
app.get("/posts/:id", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {post: foundPost});
        }
    });
});

//EDIT ROUTE
app.get("/posts/:id/edit", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost) {
        if(err) {
            res.redirect("/posts");
        } else {
            res.render("edit", {post: foundPost});
        }
    });
});

//UPDATE route
app.put("/posts/:id", function(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedBlog) {
        if(err) {
            res.redirect("/posts");
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//DELETE route
app.delete("/posts/:id", function(req, res) {
    Post.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/posts");
        }
    });
});




//Tell the server to listen for requests
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started..");
});
