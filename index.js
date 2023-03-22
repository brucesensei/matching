//-----------------------REQUIRE PACKAGES-----------------------

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const fs = require("fs");
//-----------------------USE PACKAGES----------------------------

const app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//---------------------CATEGORY ARRAY---------------------------

const choices = ["animals", "nature", "months"];

//------------------VARIABLES TO PASS WITH EJS------------------

let category = "";
let imageArray = [];
let players = "";
let userChoices = [];

//--------------------APP ROUTES--------------------------------

app.get("/", function(req,res) {
  res.render("pages/index", { choices: choices });
})

app.post("/", function(req, res) {
  category = req.body.categorylist;
  imageArray = fs.readdirSync(`public/images/${category}/`);
  res.redirect("/select");
})

app.get("/select", function(req, res) {
  res.render("pages/select", { imageArray: imageArray, category: category });
})

app.post("/select", function(req, res) {
  let userPics = req.body;
  if (Object.keys(userPics).length ==  1) {
    res.redirect("/select");
  } 
  let arrayKey = Object.keys(userPics)[1]
  players = req.body.players;
  const firstArray = userPics[arrayKey];
  if (firstArray[0].length == 1) {
    res.redirect("/select")
  } else {
    const secondArray = [...firstArray];
    const joinedArrays = [...firstArray, ...secondArray];
    userChoices = joinedArrays.sort((a, b) => 0.5 - Math.random());
    res.redirect("/game");
  }
})

app.get("/game", function(req, res) {
  res.render("pages/game", { players: players, userChoices: userChoices, category: category });
})


app.listen(process.env.PORT || 3000, function(){
  console.log("server running on port 3000");
})