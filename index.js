const express = require("express");
const app = express();
const path = require("path");

port = 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res)=>{
    res.render("rolldice.ejs");
})

app.get("/rolldice", (req, res) => {
    const diceValue = Math.floor(Math.random() * 6) + 1; // Generate random dice value
    res.render("rolldice", { diceValue }); // Pass it to the template
});

app.get("/ig/:username",(req, res)=>{
    let { username } = req.params;
    console.log(`${username}`);
    res.render("username", {username})
})