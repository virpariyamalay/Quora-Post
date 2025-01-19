const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

const { v4: uuidv4 } = require('uuid');
//uuidv4(); for generating unique id ,command:-npm i uuid


const methodOverride = require("method-override");
// override with POST having ?_method=DELETE command npm i method-override


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.set("view engine ", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "rahul",
        content: "my name is rahul"
    },
    {
        id: uuidv4(),
        username: "rohit",
        content: "my name is rohit"
    },
    {
        id: uuidv4(),
        username: "rohan",
        content: "my name is rohan"
    },
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {

    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id == p.id);

    res.render("show.ejs", { post });
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newcontent;
    console.log(post.content);
    res.redirect("/posts");


})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs", { post });
})


app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id != p.id);
    res.redirect("/posts");
}
)

app.listen(port, () => {
    console.log("app is listing on port no 8080");
})

