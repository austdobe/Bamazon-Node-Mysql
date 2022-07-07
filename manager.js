var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456789",
    database: "bamazonDB"
});

connection.connect(function(err){
    if(err)throw err;
    console.log("connected as id "+connection.threadId + "\n")
})

function start(){
    inquirer.prompt({
        name: "action", 
        type: "rawlist",
        message: "What would you like to update?",
        choices: [
            "Add product",
            "Update quantity"
        ]
    })
}