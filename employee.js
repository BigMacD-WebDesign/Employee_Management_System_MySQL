const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");
var connection  
    try {
         connection = mysql.createConnection({ 
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Password123",
            database: "employee_db" 
        });

        console.log(`Connected to db with id: ${connection.threadId}`);
        userchoice();
        // connection.end();
    }catch (error) {
        console.log(error);
    }




function userchoice () {
    inquirer.prompt([
        {
            name: "employee",
            type: "list",
            choices: ["Add Employee", "Add Role", "Add Department", "Display Employee Records", "Display All Departments", "Display All Roles", "Exit Application"]
        }
    ]).then((userresponse) => {
        switch (userresponse.employee){
            case "Add Employee":
               addEmployee()
                break
            case "Add Role":
                addRole()
                break
            case "Add Department":
                addDepartment()
                break
            case  "Display Employee Records":
                displayEmployee()
                break
            case "Display All Departments":
                displayDept()
                break
            case "Display All Roles":
                displayRoles()
                break
                default:
                    connection.end();
                    process.exit(0);

        }
    })
};


function displayEmployee () {
    connection.query("SELECT * FROM employee;", function (err, res) {
        if (err)
            throw err
        console.table(res);
        userchoice();
    });
};

function displayDept () {
    connection.query("SELECT * FROM department;", function (err, res) {
        if (err)
            throw err
        console.table(res);
        userchoice();
    });
};

function displayRoles () {
    connection.query("SELECT * FROM role;", function (err, res) {
        if (err)
            throw err
        console.table(res);
        userchoice();
    });
};




function addEmployee() {
    inquirer.prompt([
        {
            type: "Input",
            name: "firstName",
            message: "Enter Employee First Name"
        },
        {
            type: "Input",
            name: "lastName",
            message: "Enter Employee Last Name"
        },
        {
            type: "List",
            name: "roleId",
            message: "Enter Employee Role ID",
            choices: [1,2,3,4,5,6]
        },
        {
            type: "List",
            name: "managerId",
            message: "Enter Manager ID",
            choices: [1,2,3]
        },
    ]).then((res) => {
        connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id)  VALUE (?, ?, ?, ?);", [res.firstName, res.lastName, res.roleId, res.managerId], (err, result)=>{
            if (err)
                throw err

            console.table(result);
            userchoice();
        })
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "Input",
            name: "departmentName",
            message: "Enter department Name"
        }
    ]).then((res) => {
        connection.query("INSERT INTO department(name)  VALUE (?);", res.departmentName,

         (err, result) => {
            if (err)
                throw err

            console.table(result);
            userchoice();
        })
    })
}

