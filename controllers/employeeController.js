//In here, CRUD operations are implemented related to EmployeeDB

const express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");

router.get("/", (req, res) => {
  res.render("employee/addOredit", {
    viewTitle: "Insert Employee",
  });
});

router.post("/", (req, res) => {
  insertRecord(req, res);
});

//To innsert employee records in MongoDB
function insertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;

  //if no errors in insert, redirect to new route
  employee.save((err, doc) => {
    if (!err) res.redirect("employee/list");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
          viewTitle: "Update Employee",
          employee: req.body,
        });
      } else console.log("Error during record insertion : " + err);
    }
  });
}

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/list", (req, res) => {
  //res.json("from list");
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list", {
        //return records inside of list created
        list: docs,
      });
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});

//To export the router object
module.exports = router;
