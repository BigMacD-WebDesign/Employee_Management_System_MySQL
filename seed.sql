USE employee_db;

INSERT INTO department(name)
VALUE ("Development Department");

INSERT INTO department(name)
VALUE ("Accounting Department");

INSERT INTO department(name)
VALUE ("Customer Service Department");

SELECT * FROM employee;

INSERT INTO role(title, salary, department_id)
VALUE ("Manager", 30, 1);

INSERT INTO role(title, salary, department_id)
VALUE ("Manager", 45, 2);

INSERT INTO role(title, salary, department_id)
VALUE ("Manager", 80, 3);

INSERT INTO role(title, salary, department_id)
VALUE ("Team Lead", 17, 1);

INSERT INTO role(title, salary, department_id)
VALUE ("Team Lead", 30, 2);

INSERT INTO role(title, salary, department_id)
VALUE ("Team Lead", 50, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE ("Tim", "Harvey", 1, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE ("Tony", "Stark", 2, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE ("Johnny", "B. Goode", 3, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE ("Kevin", "Hart", 4, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE ("Jimmy", "Neutron", 5, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE ("Thomas", "Sparta", 6, 3);

SELECT * FROM role;