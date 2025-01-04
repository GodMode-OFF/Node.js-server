const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// gotta use passport module for cookies and shi and bcrypt for encryption
const app = express();

port = 3000;

app.use(express.static("public"));
app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))


mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = {
    email: String,
    password: String
};

const User = new mongoose.model("User", userSchema);


app.get("/", (req, res)=>{
    res.render("home.ejs");
})

app.get("/login", (req, res)=>{
    res.render("login.ejs");
})

app.get("/register", (req, res)=>{
    res.render("register.ejs");
})


app.post("/register",async (req, res)=>{
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    try {
        await newUser.save();
        res.render("secrets.ejs");
    } catch (err) {
        console.log(err);
    }
    
})

app.post("/login", async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try {
        const foundUser = await User.findOne({ email: req.body.username });
        if (foundUser) {
            if (foundUser.password === password) {
                res.render("secrets.ejs");
            } else {
                res.status(401).send("Incorrect password");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error("Error finding user:", err);
        res.status(500).send("An error occurred");
    }
    
})





app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});




