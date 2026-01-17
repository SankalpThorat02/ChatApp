const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

const methodOverride = require("method-override");

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride("_method"));

main().then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.listen(port, () => {
    console.log(`App is listening at ${port}`);
})

app.get('/', (req, res) => {
    res.send("Hello");
})

//Index Route
app.get('/chats', async (req, res) => {
    let chats = await Chat.find();
    res.render("home.ejs", {chats});
})

//New Route 
app.get('/chats/new', (req, res) => {
    res.render("newChat.ejs");
})

//Create Route 
app.post('/chats', async (req, res) => {
    let {from, to, msg} = req.body;
    await Chat.insertOne({from, to, msg, created_at: new Date()});
    res.redirect('/chats');
})

//Edit Route 
app.get('/chats/:id/edit', async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    
    res.render("edit.ejs", {chat});
})

//Update Route
app.patch('/chats/:id', async (req, res) => {
    let {id} = req.params;
    let {msg} = req.body;

    let chat = await Chat.findByIdAndUpdate(id, {msg}, {new: true});
    res.redirect('/chats');
})