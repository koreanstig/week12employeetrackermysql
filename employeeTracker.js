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