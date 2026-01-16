const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chats = [
    {
        from: "Sankalp",
        to: "Destiny",
        msg: "Hey Destiny!",
        created_at: new Date()
    },
    {
        from: "Aarav",
        to: "Aditi",
        msg: "Bro, are you joining the meeting?",
        created_at: new Date()
    },
    {
        from: "Anchal",
        to: "Aarav",
        msg: "Yeah, joining in 5 mins",
        created_at: new Date()
    },
    {
        from: "Neha",
        to: "Saumya",
        msg: "Did you finish the assignment?",
        created_at: new Date()
    },
    {
        from: "Khushi",
        to: "Neha",
        msg: "Almost done, will send soon",
        created_at: new Date()
    },
    {
        from: "Rahul",
        to: "Sankalp",
        msg: "Let's catch up tonight",
        created_at: new Date()
    },
    {
        from: "Sankalp",
        to: "Rahul",
        msg: "Sure, ping me after dinner",
        created_at: new Date()
    }
];

Chat.insertMany(chats).then(res => console.log(res))
    .catch(err => console.log(err));
