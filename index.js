const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main().then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const chat = new Chat({
    from: "Sankalp",
    to: "Dny",
    msg: "Hello",
    created_at: new Date()
});

chat.save().then(res => console.log(res))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`App is listening at ${port}`);
})

app.get('/', (req, res) => {
    res.send("Hello");
})