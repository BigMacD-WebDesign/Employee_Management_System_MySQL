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
        userChoice();
        // connection.end();
    }catch (error) {
        console.log(error);
    }




function userChoice () {
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

//Functions to display data from each individual table.
function displayEmployee () {
    connection.query("SELECT e.first_name, e.last_name, e.id AS employee_id, r.salary, r.title, d.name AS department_name FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ORDER BY e.id;", function (err, res) {
        if (err)
            throw err
        console.table(res);
        userChoice();
    });
};

function displayDept () {
    connection.query("SELECT * FROM department;", function (err, res) {
        if (err)
            throw err
        console.table(res);
        userChoice();
    });
};

function displayRoles () {
    connection.query("SELECT * FROM role;", function (err, res) {
        if (err)
            throw err
        console.table(res);
        userChoice();
    });
};



//Functions to add employee, roles and departments.
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
            userChoice();
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
            userChoice();
        })
    })
};

function addRole () {
    inquirer.prompt([
        {
            type: "Input",
            name: "title",
            message: "Add Role Title."
        },
        {
            type: "Input",
            name: "salary",
            message: "Enter hourly Salary"
        },
        {
            type: "Input",
            name: "departmentId",
            message: "Enter department ID (1-3)"
        }
    ]).then((res) => {
        connection.query("INSERT INTO role(title, salary, department_id) VALUE (?, ?, ?)", [res.title, res.salary, res.departmentId], (err) => {
            if (err) throw err

            console.table(res)
            userChoice();
        })
    })
};

