DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
	id INTEGER AUTO_INCREMENT NOT NULL,
	name VARCHAR(30),
    
    PRIMARY KEY (id)
);

CREATE TABLE role( 
	id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(5, 2),
    department_id INTEGER,
    
    PRIMARY KEY(id),
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id)
);



CREATE TABLE employee(
	id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    
    PRIMARY KEY(id),
    CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id)
);

INSERT INTO department(name)
VALUE ("Development Department");

INSERT INTO department(name)
VALUE ("Accounting Department");

INSERT INTO department(name)
VALUE ("Customer Service Department");

SELECT * FROM role;