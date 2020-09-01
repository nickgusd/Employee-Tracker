var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table")

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
      var query = "SELECT * FROM employee";
      connection.query(query, function(err, res) {
        if (err) throw err;
       
          // console.log(console.table("Employee: " + res[i].id + res[i].first_name + res[i].last_name + res[i].role_id + res[i].manager_id));
          console.log(console.table(res))
          console.log("it works")
        // runSearch();
      });
      
    }

    function employeesDepartment() {
      var query = "SELECT employee_role.id, employee_role.title, employee_role.salary, employee_role.department_id FROM employee_role INNER JOIN department ON (employee_role.department_id = department.id) WHERE (employee_role.department_id =? AND department.id =?)"
      connection.query(query, function(err, res) {
        if (err) throw err;
       
          // console.log(console.table("Employee: " + res[i].id + res[i].first_name + res[i].last_name + res[i].role_id + res[i].manager_id));
          console.log(console.table(res))
          console.log("employees by department")
        // runSearch();
      });
    }





 