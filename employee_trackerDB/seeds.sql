-- DEPT SEEDS --
INSERT INTO department (name)
VALUE ("SALES");
INSERT INTO department (name)
VALUE ("SERVICE");
INSERT INTO department (name)
VALUE ("FINANCE");
INSERT INTO department (name)
VALUE ("PARTS");

-- ROLE SEEDS --
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 70000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Advisor", 60000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Manager", 200000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Counter", 40000, 4);

-- EMPLOYEE SEEDS -- 
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("David", "Lee", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Brandon", "LeMaster", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mookie", "Dedic", 1, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Doe", 2, 4);

-- Select tables --
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;