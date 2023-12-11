const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table'); // formats & displays readable tables

// Connects to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'bootc@mp',
        database: 'emp_db'
    },
);
db.connect(err => {
    if (err) throw err;
    console.log('Connected to the emp_db database ✅')
    welcomeHeader();
})

welcomeHeader = () => {
    console.log("***********************************")
    console.log("*           Welcome To:           *")
    console.log("*        EMPLOYEE TRACKER         *")
    console.log("*                                 *")
    console.log("***********************************")
    prompts();
}

const prompts = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View All Employees',
                       'Add Employee',
                       'Update Employee Role',
                       'View All Roles',
                       'Add Role',
                       'View All Departments',
                       'Add Department',
                       'Exit']
        }
    ])
    .then((userResponse) => {
        const { choices } = userResponse;

        if (choices === 'View All Employees') {
            viewEmp();
        }
        
        if (choices === 'Add Employee') {
            addEmp();
        }

        if (choices === 'Update Employee Role') {
            updateEmpRole();
        }

        if (choices === 'View All Roles') {
            viewRoles();
        }

        if (choices === 'Add Role') {
            addRole();
        }

        if (choices === 'View All Departments') {
            viewDept();
        }

        if (choices === 'Add Department') {
            addDept();
        }

        if (choices === 'Exit') {
            db.end();
        }
    });
};

// Function to view employees
viewEmp = () => {
    console.log("***********************************")
    console.log("*           Employees:            *")
    console.log("***********************************")

    db.query(`SELECT employee.id, 
                employee.first_name,
                employee.last_name,
                role.title,
                department.name AS department,
                role.salary,
                employee.manager_id
              FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
              `,
              (err, results) => {
                if (err) throw err;
                console.table(results);
                prompts();
              })
};