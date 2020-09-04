require("./models/db");

//start express server
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");


//instead of passsing data with url parameters
const bodyparser = require("body-parser");

var app = express();
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.use(bodyparser.json());

//handle-bars
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);

app.set("view engine", "hbs");

//Request statement for employeeController
const employeeController = require("./controllers/employeeController");

app.listen(5000, () => {
  console.log("Express server started at port : 5000");
});

app.use("/employee", employeeController);
