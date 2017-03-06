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
connection.connect(function (err) {
    if (err) throw err;
});

var questions = [
    {
        type: 'input',
        name: 'product',
        message: 'Type the id number of the product you wish to buy.'
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many would you like to buy?',
    }
];

function start() {
    inquirer.prompt(questions).then(function(answers) {
        
        var product = answers.product;
        var quantity = answers.quantity;

        connection.query("SELECT * FROM products WHERE item_id=?", [product], function (err, res) {

            if (res[0].stock_quantity < quantity) {
                console.log("Not enough in stock.");
                start();
            } else {
                var updatedQuantity = res[0].stock_quantity - quantity;
                console.log("Sold. There are " + updatedQuantity + " available");
                console.log("$" + res[0].price * quantity);
                connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: updatedQuantity }, { item_id: product }], function (err, res) { });
                start();
            };
        });
    });
}

connection.query("SELECT * FROM products", function (err, res) {
        console.log("                                                                           ");
    for (var i = 0; i < res.length; i++) {
        console.log("ID:" + res[i].item_id + " Make:" + res[i].department_name + " Model:" + res[i].product_name + " Price: $" + res[i].price + " Stock quantity:" + res[i].stock_quantity);
        console.log("--------------------------------------------------------------------");
    }
    
});

var myVar = setTimeout(start, 500);
