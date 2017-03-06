var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "5320422",
  database: "bamazondb"
});

connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  console.log(res);
});


connection.connect(function(err) {
  if (err) throw err;
  
});

var start = function() {
  inquirer.prompt({
    name: "choice",
    type: "input",
    message: "Type the id number of the car you wish to purchase.",
  }).then(function(answer) {
    console.log(answer)
  });
};
start();

