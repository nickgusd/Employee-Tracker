
DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE employee_role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(20, 2) NOT NULL, 
department_id INT(10) NOT NULL,
PRIMARY KEY (id)

);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT(10) NOT NULL,
manager_id INT(10) NOT NULL,
PRIMARY KEY (id)

);


INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2), ("Sales Lead",	100000,	1), ("Lawyer", 190000,	4), ("Salesperson",	80000, 1), ("Account Manager",	160000,	3), ("Accountant", 125000,	3), ("Software Engineer",	120000,	2), ("Legal Team Lead",	200000,	4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rick",	"Sanchez",	3,	0), ("Peter",	"Griffin",	4,	0), ("Morty",	"Smith",	2,	3), ("Beth",	"Smith",	1,	4), ("Lois",	"Griffin",	5,	0), ("Ben",	"Miller",	7,	2), ("Patrick",	"Star",	6,	1), ("Michael",	"Jordan",	8,	0);






-- * **department**:

--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name

-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to

-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager