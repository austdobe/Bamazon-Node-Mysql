var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456789",
    database: "bamazonDB"
});
var cart = [];

connection.connect(function(err){
    if(err)throw err;
    console.log("connected as id "+connection.threadId + "\n")
    start()
})

function start(){
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Search by department",
            "Search all products",
            "Search cheap products",
            "Quit"
        ]
    }).then(function(answer){
        var choice = answer.action
        inquirer.prompt({
            name: "confirm",
            type: "list",
            message: "You chose "+ answer.action+ ", is this correct?",
            choices: [
                "Yes", 
                "No"
            ]
        
        }).then(function(answer){
            if(answer.confirm ==="Yes"){
                // console.log(choice)
                switch (choice){
                    case "Search by department":
                        searchDep();
                        break;
                    case "Search all products":
                        searchAll();
                        break;
                    case "Search cheap products":
                        searchCheap();
                    case "Quit":
                        connection.end();
                        break;
                }
            }else{
                start()
            }
            
        })
    })
}
    function searchDep(){
        // console.log("Search department")
        inquirer.prompt({
            name: "department",
            type: "rawlist",
            message: "What department would you like to search?",
            choices: [
                "Home Goods",
                "Office Supply",
                "Clothing",
                "Sporting",
                "Footwear",
                "Electronics"
            ]
        }).then(function(answer){
        var query = "select item_id, product_name, price, quantity from products where ?";
        connection.query(query, {department_name: answer.department}, function(err, res){
            for(var i = 0; i<res.length; i++){
                
                console.log("\nItem id: " + res[i].item_id + " | Product Name: " +res[i].product_name+ " | Department Name: "+ res[i].department_name + " | Price: " + res[i].price + " | Quantity: " + res[i].quantity)
                    
            }
            buy()
            // connection.end()
        })
        

        })
    }
    function searchAll(){
        // console.log("Search all")
        connection.query("select * from products", function(err, res){
            for(var i = 0; i<res.length; i++){
                
                console.log("\nItem id: " + res[i].item_id + " | Product Name: " +res[i].product_name+ " | Department Name: "+ res[i].department_name + " | Price: " + res[i].price + " | Quantity: " + res[i].quantity)
                    
            }
            buy()
            // connection.end()
        })
    }
    function searchCheap(){
        connection.query("select * from products where price < 20", function(err, res){
            for(var i = 0; i<res.length; i++){
                
                console.log("\nItem id: " + res[i].item_id + " | Product Name: " +res[i].product_name+ " | Department Name: "+ res[i].department_name + " | Price: " + res[i].price + " | Quantity: " + res[i].quantity)
                    
            }
            buy()
            // connection.end()
        })
    }
    
    function buy(){
        inquirer.prompt([
            {
            name: "buy",
            type: "input",
            message: "What item number would you like to purchase?(press 'n' for new search)"
            
            },
        ]).then(function(answer){
            var answer = answer.buy
            
            if (answer === "n"){
                start();
            }
            inquirer.prompt(
            {
                name: "quantity",
                type: "Number",
                message: "How many would you like?"
            }).then(function(answer){
                var amount = answer.quantity
                var query = "update products set quantity = quantity - ? where item_id=?;";
                connection.query(query, [{quantity:amount}, answer], function(err, res){
                    console.log("Purchase Successful");
                    connection.end()
                })
            })
        })  
    }
