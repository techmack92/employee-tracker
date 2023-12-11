DROP DATABASE IF EXISTS emp_db;
CREATE DATABASE emp_db;

-- Uses/selects the emp_db --
USE emp_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30), 
    department_id INT
    salary DECIMAL,     
    FOREIGN KEY department_id REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    role_id INT,
    FOREIGN KEY role_id REFERENCES role(id) ON DELETE SET NULL
    manager_id INT
    FOREIGN KEY manager_id REFERENCES employee(id) ON DELETE SET NULL
);