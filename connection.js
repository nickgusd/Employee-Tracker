var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // My port; 
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "dacosta2",
  database: "company_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId)
   start()
  });

  function start() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View ALL Roles",
          "Add Role",
          "Remove Role",
          "View All Departments",
          "Add Department",
          "Quit"

        ]
      })

      .then(function(answer) {
        switch (answer.action) {
        case "View All Employees":
          employeeRoster();
          break;
  
        case "View All Employees by Department":
          employeesDepartment();
          break;
  
        case "View All Employees by Manager":
          employeeManager();
          break;
  
        case "Add Employee":
          addEmployee();
          break;
  
        case "Remove Employee":
          removeEmployee();
          break;
        
        case "Update Employee Role":
          updateRole();
          break;

        case "Update Employee Manager":
          updateManager();
          break;

        case "View ALL Roles":
          viewRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Quit":
          connection.end();
          break;
        }
      });

    }


    function employeeRoster() {
      console.log("testing code")
    }





 