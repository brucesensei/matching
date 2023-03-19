const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");

const app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res) {
  console.log("implements index get route")
  res.render("pages/index");
})

app.post("/", function(req, res) {
  console.log("implements the index post route");
  console.log("hello variables.");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server running on port 3000");
})