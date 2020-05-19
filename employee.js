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
            choices: ["Add Employee", "view role", "view department", "display: employee records", "display all departments", "display all roles", "exit application"]
        }
    ]).then((userresponse) => {
        switch (userresponse.employee){
            case "Add Employee":
               addEmployee()
                break
            case "Add Role":
                addRole()
                break
            case "Add department":
                addDepartment()
                break
            case  "Display: employee records":
                displayEmployee()
                break
            case "Display all departments":
                displayDept()
                break
            case "Display all roles":
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
            name: "departmenttName",
            message: "Enter departmentt Name"
        }
    ]).then((res) => {
        connection.query("INSERT INTO department(department_name)  VALUE (?);", res.departmenttName,

         (err, result) => {
            if (err)
                throw err

            console.table(result);
            userchoice();
        })
    })
}
