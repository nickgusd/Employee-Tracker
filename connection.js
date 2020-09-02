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
       
          console.log(console.table(res))
          console.log("it works")
       
      });
      
    }

    function employeesDepartment() {
      // var query = "SELECT * FROM department"
      // var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id FROM employee LEFT [OUTER] JOIN department "
      var query = "SELECT employee_role.id, employee_role.title, employee_role.salary, employee_role.department_id, department.name FROM employee_role LEFT JOIN department ON employee_role.department_id = department.id"
      connection.query(query, function(err, res) {
        if (err) throw err;
       
          console.log(console.table(res))
          console.log("employees by department")

      });
        
    }

    function employeeManager() {
     
      var query = "SELECT * FROM employee";
      connection.query(query, function(err, res) {
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
          if (res[i].manager_id == 1) {
            res[6].manager_id = "rick";
            
          } else if (res[i].manager_id == 2) {
            res[5].manager_id = "Lois";
          } else if (res[i].manager_id == 3) {
            res[2].manager_id = "Michael";
          } else if (res[i].manager_id == 4)  {
            res[3].manager_id = "Peter";
          } else {
            res[i].manager_id = "No Manager";
          }

        }
          console.log(console.table(res))
         
      });

    }

    function addEmployee() {
      inquirer
      .prompt([
        {
          type: "input",
          message: "What is your employee's first name?",
          name: "firstname", 
      },  
      {
          type: "input",
          message: "What is your employee's last name?",
          name: "lastname",
      },
      {
          type: "input",
          message: "What is your employee's role?",
          name: "employeerole",
      },
      {
          type: "input",
          message: "Who is your employee's manager?",
          name: "manager",
    },
  ])
    .then(function(data) {
      console.log(data)
     
      // VALUES ("Rick",	"Sanchez",	3,	0)
      var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) " + "VALUES " + "(" + `${data.firstname}` + "," + `${data.lastname}` + "," + `${data.employeerole}` + "," + `${data.manager}` + ")";

      connection.query(query, function(err, res) {
        if (err) throw err;
       
          console.log(console.table(res))
          console.log("employees by department")

      });

  })
    .catch(function(err) {
      throw err;
  }) 
    }

    function removeEmployee() {

      inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Which employee do you want to remove?",
        choices: [
          "Rick",
          "Peter",
          "Morty",
          "Beth",
          "Lois",  
          "Ben",
          "Patrick",
          "Michael",
          
        ]
      })
      .then(function(data) {

          console.log(data.action)

          var query = "DELETE FROM employee WHERE first_name =?" 
          connection.query(query, [data.action], function(err, res) {
          if (err) throw err;
       
          console.log(console.table(res))
          console.log("it works")
       
      });

      })

    }
 

    function updateRole() {

      inquirer
      .prompt({
        name: "role",
        type: "list",
        message: "Which employee's role do you want to update?",
        choices: [
          "Rick",
          "Peter",
          "Morty",
          "Beth",
          "Lois",  
          "Ben",
          "Patrick",
          "Michael",
          
        ]},
        {
          name: "position",
          type: "list",
          message: "Which employee's role do you want to assign the selected employee?",
          choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",  
            "Accountant",
            "Legal Team Lead",
          ]}
      )

      .then(function(data) {
        console.log(data)
      })

    }

