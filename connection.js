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

  const departmentobj = {
    id1: "Sales",
    id2: "Engineering",
    id3: "Finance",
    id4: "Legal"
  }

  const managers = {
    id1: "Rick",
    id2: "Lois",
    id3: "Michael",
    id4: "Peter"
  }

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
          "Remove Department",
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

        case "Remove Department":
          removeDepartment();
          break;

        case "Quit":
          connection.end();
          break;
        }
      });

    }

    function employeeRoster() {
      // var query = "SELECT * FROM employee";
      var query = "SELECT employee_role.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, employee_role.department_id, employee.manager_id FROM employee_role LEFT JOIN employee ON employee_role.id = employee.id"
      connection.query(query, function(err, res) {
        if (err) throw err;
        // console.table(res)
        for (var i = 0; i < res.length; i++) {
          if (res[i].department_id == 1){
            res[i].department_id = departmentobj.id1;
          } else if (res[i].department_id == 2) {
            res[i].department_id = departmentobj.id2;
          } else if (res[i].department_id == 3) {
            res[i].department_id = departmentobj.id3;
          } else if (res[i].department_id == 4) {
            res[i].department_id = departmentobj.id4;
          } else {
            console.log("All Employees")
          }

          if (res[i].manager_id == 1){
            res[i].manager_id = managers.id1;
          } else if (res[i].manager_id == 2) {
            res[i].manager_id = managers.id2;
          } else if (res[i].manager_id == 3) {
            res[i].manager_id = managers.id3;
          } else if (res[i].manager_id == 4) {
            res[i].manager_id = managers.id4;
          } else if (res[i].manager_id == 0) {
            res[i].manager_id = "No Manager";
          } else {
            return
          }
          
        }
        console.table(res)
   
       
      });
      
    }
    
    // start()

    function employeesDepartment() {

      inquirer
    .prompt([
      {
        name: "department", 
        type: "list",
        message: "Which department would you like to see employees for?",
        choices: [
          "Sales",
          "Engineering",
          "Finance",
          "Legal",
        ]}  
  ])
  .then(function(data) {

    // console.log(data.department)

    var query = "SELECT employee_role.id, employee_role.title, employee_role.salary, employee_role.department_id, department.name FROM employee_role LEFT JOIN department ON employee_role.department_id = department.id"
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res)
       
      //   for (var i = 0; i < res.length; i ++) {
      //     if(res[i].name == data.department) {
      //       var query2 = "SELECT * FROM employee WHERE role_id = 1 or role_id = 4";
      //       connection.query(query2, function(err, res2) {
      //         if (err) throw err;
      //         console.table(res2)
      //       })
      //     } else if (res[1].name == data.department) {
      //       var query3 = "SELECT * FROM employee WHERE role_id = 6 or role_id = 3";
      //       connection.query(query3, function(err, res3) {
      //         if (err) throw err;
      //         console.log(console.table(res3))
      //       })
      //     } else if (res[2].name == data.department) {
      //       var query4 = "SELECT * FROM employee WHERE role_id = 5 or role_id = 7";
      //       connection.query(query4, function(err, res4) {
      //         if (err) throw err;
      //         console.log(console.table(res4))
      //       })
      //     } else if (res[3].name == data.department){
      //       var query5 = "SELECT * FROM employee WHERE role_id = 2 or role_id = 8";
      //       connection.query(query5, function(err, res5) {
      //         if (err) throw err;
      //         console.log(console.table(res5))
      //       })
      //     } else {
      //       console.log("No other departments")
      //     }
      // }
      });

})

      // var query = "SELECT * FROM department"
      // var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id FROM employee LEFT [OUTER] JOIN department "
      // var query = "SELECT employee_role.id, employee_role.title, employee_role.salary, employee_role.department_id, department.name FROM employee_role LEFT JOIN department ON employee_role.department_id = department.id"
      // connection.query(query, function(err, res) {
      //   if (err) throw err;
       
      //     // console.log(console.table(res))
      //     console.log("employees by department")

      // });
      // start()
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
      // start()
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
      // console.log(data)
     
      
      var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) " + "VALUES " + "( '"+ `${data.firstname}` + "','" + `${data.lastname}` + "'," + `${data.employeerole}` + "," + `${data.manager}` + ")";

      connection.query(query, function(err, res) {
        if (err) throw err;
          console.log(res)

      
      });

      
      var query = "SELECT * FROM employee";
      connection.query(query, function(err, res) {
        if (err) throw err;
       

        var newEmployee = res[res.length -1]


        for (var i = 0; i < res.length; i++) {
          if (res[i].role_id == 1) {
            newEmployee.role_id = "Lead Engineer"
          } else if (res[i].role_id == 2) {
            newEmployee.role_id = "Sales Lead"
          } else if (res[i].role_id == 3) {
            newEmployee.role_id = "Lawyer"
          } else if (res[i].role_id == 4) {
          newEmployee.role_id = "Salesperson"
          } else if (res[i].role_id == 5) {
          newEmployee.role_id = "Account Manager"
          } else if (res[i].role_id == 6) {
            newEmployee.role_id = "Accountant"
          } else if (res[i].role_id == 7) {
            newEmployee.role_id = "Software Engineer"
          } else if (res[i].role_id == 8) {
            newEmployee.role_id = "Legal Team Lead"
          } else {
            console.log("Added to the database")
          }
      }

      
          if (newEmployee.manager_id  == 1) {
          newEmployee.manager_id = "Rick";
        } else if (newEmployee.manager_id  == 2) {
          newEmployee.manager_id = "Lois";
        } else if (newEmployee.manager_id  == 3) {
          newEmployee.manager_id = "Michael";
        } else if (newEmployee.manager_id  == 4) {
          newEmployee.manager_id = "Peter";
        } else {
          newEmployee.manager_id = "No Manager"
        }
    

        console.table(newEmployee)
          
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
      // start()
    }
 
    function updateRole() {

      inquirer
      .prompt([{
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
        ])
      .then(function(data) {
        console.log(data)

        // var query = "SELECT * FROM employee";
        var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee_role.title FROM employee LEFT JOIN employee_role ON employee.id = employee_role.id"
          connection.query(query, function(err, res) {
          if (err) throw err;
       
            for (var i = 0; i < res.length; i++) {
              if (data.role == res[i].first_name) {
                res[i].title = data.position;
              }
            }
          console.log(res[0].first_name)
          console.log(console.table(res))
      });

      })
      .catch(function(err) {
        throw err;
    })
    // start()
    }


  function updateManager() {

    inquirer
    .prompt([{
      name: "employee",
      type: "list",
      message: "Which employee do you want switch manager's for?",
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
      name: "manager",
      type: "list",
      message: "Which manager do you want to assign the selected employee?",
      choices: [
        "Rick",
        "Lois",
        "Michael",
        "Peter",
        ]}
      ])
      .then(function(data) {
        console.log(data)

        var query = "SELECT * FROM employee";
          connection.query(query, function(err, res) {
          if (err) throw err;
       
            for (var i = 0; i < res.length; i++) {
              if (data.employee == res[i].first_name) {
                res[i].manager_id = data.manager;
                
              }
            }
            console.table(res)
          console.log("updated employee manager")
      });

      })
      .catch(function(err) {
        throw err;
    })
    // start()
    }

   function viewRoles() {
    var query = "SELECT employee_role.id, employee_role.title, employee_role.salary, department.name FROM employee_role LEFT JOIN department ON employee_role.department_id = department.id"
    connection.query(query, function(err, res) {
      if (err) throw err;
     
        console.log(console.table(res))
        console.log("View All Roles")

    });
    // start()
   }


   function addRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "role", 
    },  
    {
        type: "input",
        message: "What is the salary of the role?",
        name: "salary",
    },
    {
        type: "input",
        message: "Which department does the role belong to?",
        name: "department",
    },
])
  .then(function(data) {
    console.log(data)

    // var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) " + "VALUES " + "( '"+ `${data.firstname}` + "','" + `${data.lastname}` + "'," + `${data.employeerole}` + "," + `${data.manager}` + ")";

    var query = "INSERT INTO employee_role (title, salary, department_id) " + "VALUES " + "( '"+ `${data.role}` + "','" + `${data.salary}` + "','" + "0" + "')";
    connection.query(query, function(err, res) {
    if (err) throw err;

 
  });

  var query = "INSERT INTO department(name) " + "VALUES " + "( '"+ `${data.department}` + "')";
    connection.query(query, function(err, res) {
    if (err) throw err;

    console.log("Added to Database")
  });

    var query = "SELECT employee_role.id, employee_role.title, employee_role.salary, department.name FROM employee_role LEFT JOIN department ON employee_role.department_id = department.id"
    connection.query(query, function(err, res) {
    if (err) throw err;

    //might need to add Async function so the data is added to the table before the tables are joined, right now showing null
      console.table(res);
    // console.log("Added to database")
  });


  })
  .catch(function(err) {
    throw err;
  })
  // start()
   }

  function removeRole() {

    inquirer
    .prompt([
      {
      name: "role",
      type: "list",
      message: "Which role do you want to remove? (Warning: this will also remove employees)",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Lead Engineer",
        "Software Engineer",
        "Account Manager",  
        "Accountant",
        "Legal Team Lead",
        "Secretary"
        ]}
      ])
      .then(function(data) {

       console.log(data.role)

        var query = "DELETE FROM employee_role WHERE title =?" 
        connection.query(query, [data.role], function(err, res) {
        if (err) throw err;
     
        console.table(res)
        // console.log("Removed Role")
    });

      var query = "SELECT * FROM employee";
      connection.query(query, function(err, res) {
      if (err) throw err;
      

      const roleId = {
        role1:	"Lead Engineer",
        role2:	"Sales Lead",
        role3:	"Lawyer",
        role4:	"Salesperson",
        role5:	"Account Manager",
        role6:	"Accountant",
        role7:	"Software Engineer",
        role8:	"Legal Team Lead"
      }

      console.log(roleId.role1)
        for (var i = 0; i < res.length; i++) {
          if (data.role == roleId.role1) {

            var query = "DELETE FROM employee WHERE id = 1" 
            connection.query(query, function(err, res) {
            if (err) throw err;
            })

          } else if (data.role == roleId.role2) {

            var query = "DELETE FROM employee WHERE id = 2" 
            connection.query(query, function(err, res) {
            if (err) throw err;
            })

          } else if (data.role == roleId.role3) {
            var query = "DELETE FROM employee WHERE id = 3" 
            connection.query(query, function(err, res) {
            if (err) throw err;
            })

          } else if (data.role == roleId.role4) {

            var query = "DELETE FROM employee WHERE id = 4" 
            connection.query(query, function(err, res) {
            if (err) throw err;
            })

          } else if (data.role == roleId.role5) {
            var query = "DELETE FROM employee WHERE id = 5" 
            connection.query(query, function(err, res) {
            if (err) throw err;
            })

          } else if (data.role == roleId.role6) {
            var query = "DELETE FROM employee WHERE id = 6" 
            connection.query(query, function(err, res) {
            if (err) throw err;
            })

          } else if (data.role == roleId.role7) {
            var query = "DELETE FROM employee WHERE id = 7" 
            connection.query(query, function(err, res) {
            if (err) throw err;
            })

          } else if (data.role == roleId.role8) {
            var query = "DELETE FROM employee WHERE id = 8" 
            connection.query(query, function(err, res) {
            if (err) throw err;
            })

          } else {
            console.log("no roles to delete")
          }
        }
      console.table(res)
      //may need to add async 
    });
    })
    // start()
    }

  function viewDepartments(){

    var query = "SELECT * FROM department";
      connection.query(query, function(err, res) {
        if (err) throw err;
       
          console.log(console.table(res))
          console.log("List of Departments")
       
      });
      // start()
  }

  function addDepartment() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "department", 
    }  
  ])
  .then(function(data) {
    console.log(data)

    // var query = "SELECT * FROM employee";
    var query = "INSERT INTO department(name) " + "VALUES " + "( '"+ `${data.department}` + "')";
    connection.query(query, function(err, res) {
    if (err) throw err;

    console.log("Added to Database")
  })

  })
  .catch(function(err) {
    throw err;
})
// start()
  }

  function removeDepartment() {
    inquirer
    .prompt([
      {
        name: "department", 
        type: "list",
        message: "Which department would you like to remove?",
        choices: [
          "Sales",
          "Engineering",
          "Finance",
          "Legal",
          "Admin",
          "MGMT",
          "Marketing"
        ]}  
  ])
  .then(function(data) {
    console.log(data)

    const departmentobj = {
      id1: "Sales",
      id2: "Engineering",
      id3: "Finance",
      id4: "Legal"
    }

    // var query = "SELECT * FROM employee";
    var query = "DELETE FROM department WHERE name=?" 
    connection.query(query,[data.department], function(err, res) {
    if (err) throw err;
    })


    var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee_role.title, employee_role.department_id FROM employee LEFT JOIN employee_role ON employee.id = employee_role.id"

    connection.query(query, function(err, res) {
    if (err) throw err;
    // console.log(console.table(res))
    // console.log(res)

      for (var i = 0; i < res.length; i++) {
        if (res[i].department_id == departmentobj.id1) {
        var query = "DELETE FROM employee_role WHERE department_id = 1" 
        connection.query(query, function(err, res) {
        if (err) throw err;
        })

        } else if (res[i].department_id == departmentobj.id2) {
        var query = "DELETE FROM employee_role WHERE department_id = 2"
        connection.query(query, function(err, res) {
        if (err) throw err;
        })
  
        } else if (res[i].department_id == departmentobj.id3) {
        var query = "DELETE FROM employee_role WHERE department_id = 3"
        connection.query(query, function(err, res) {
        if (err) throw err;
        })
        } else {

        var query = "DELETE FROM employee_role WHERE department_id = 4"
        connection.query(query, function(err, res) {
        if (err) throw err;
        })
        }
      }
         console.log("removed department" + data.department)
    })
  })
  .catch(function(err) {
    throw err;
})
// start()
  }
