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
    }]).then((answer)=>{
        switch (answer.choice) {
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all employees by Roles':
                viewEmpByRoles();
                break;
            case 'View all employees by Dept':
                viewEmpByDept();
                break;
            case 'Update Employee':
                updateEmployee();
                break;
            default:
                break;
        }
    });
};

// before adding employee, we need to query for role
const roleArr = [];
function selectRole(){
    connection.query("SELECT * FROM role", (err,res)=>{
        if (err) throw err;
        for (i=0;i<res.length;i++){
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
};

// need to do the same for manager
const manArr = [];
function selectManager(){
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", (err,res)=>{
        if (err) throw (err);
        for (i=0;i<res.length;i++){
            manArr.push(res[i].first_name);
        }
    })
    return manArr;
};

// add employee
function addEmployee(){
    inquirer.prompt([{
        name: "firstName",
        type: "input",
        messsage: "Employee's first name?"
    },
    {
        name: "lastName",
        type: "input",
        message: "Employee's last name?"
    },
    {
        name: 'role',
        type: 'list',
        message: "Employee's role?",
        choices: selectRole()
    },
    {
        name: 'choice',
        type: 'rawlist',
        message: "Manager's name?",
        choices: selectManager()
    }]).then((answer)=>{
        const roleId = selectRole().indexOf(answer.role) + 1;
        const managerId = selectManager().indexOf(answer.choice) + 1;
        connection.query("INSERT INTO employee SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: roleId,
            manager_id: managerId
        }, (err)=>{
            if (err) throw (err);
            console.table(answer);
            runPrompt();
        });
    });
};