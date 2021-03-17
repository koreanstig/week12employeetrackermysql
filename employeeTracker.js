// dependencies
const inquirer = require('inquirer')
const mysql = require('mysql');
const consoleTable = require('console.table');

//create connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // make sure to change password to whatever your pw is on mySQL
    password: "",
    database: "employee_trackerDB"
});

// start connection
connection.connect((err)=>{
    if (err) throw err;
    runPrompt();
});

// create initial prompt
function runPrompt(){
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
            "Add Employee",
            "Add Role",
            "Add Department",
            "View all employees",
            "View all employees by Roles",
            "View all employees by Dept",
            "Update Employee"
        ]
    }])
};