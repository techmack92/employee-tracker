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
    console.log("███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗");
    console.log("██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝");
    console.log("█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗  ");
    console.log("██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝  ");
    console.log("███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗");
    console.log("╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝");
    console.log("████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗             ");
    console.log("╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗            ");
    console.log("   ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝            ");
    console.log("   ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗            ");
    console.log("   ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║            ");
    console.log("   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝            ");
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

// Function to add employees
// addEmp = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'firstName',
//             message: "What is the employee's first name?",
//             validate: addFirst => {
//                 if (addFirst) {
//                     return true;
//                 } else {
//                     console.log('Please enter a first name.');
//                     return false;
//                 }
//             }
//         },

//         {
//             type: 'input',
//             name: 'lastName',
//             message: "What is the employee's last name?",
//             validate: addFirst => {
//                 if (addFirst) {
//                     return true;
//                 } else {
//                     console.log('Please enter a last name.');
//                     return false;
//                 }
//             }

//         }
//     ])
//     .then(answer => {
//         const params = [answer.firstName, answer.lastName]

//         // Get role id and role title 
//         const roleQuery = `SELECT role.id, role.title FROM role`;

//         db.promise().query(roleQuery, (err, data) => {
//             if (err) throw err;
//             // Creates new array by destructuring & extracting id/title, then creating new obj with name & value
//             // (data.map is a method that iterates over each element of the 'data' array)
//             const roles = data.map(({ id, title}) => ({ name: title, value: id }));

//             inquirer.prompt([
//                 {
//                     type: 'list',
//                     name: 'role',
//                     message: "What is the employee's role?",
//                     choices: roles
//                 }
//             ])
//             .then(roleChoice => {
//                 const role = roleChoice.role;
//                 params.push(role);

//                 const mgrQuery = `SELECT * FROM employee`;

//                 db.promise().query(mgrQuery, (err, data) => {
//                     if (err) throw err;
//                     const mgrs = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

//                     inquirer.prompt([
//                         {
//                             type: 'list',
//                             name: 'manager',
//                             message: "Who is the employee's manager?",
//                             choices: mgrs
//                         }
//                     ])
//                     .then(mgrChoice => {
//                         const mgr = mgrChoice.manager
//                         params.push(manager);

//                         const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
//                                         VALUES (?, ?, ?, ?)`;
//                         db.query(query, params, (err, results) => {
//                             if (err) throw err;
//                             console.log('Employee has been added✨');
//                             viewEmp();
//                         });
//                     });
//                 });
//             });
//         });
//     });
// };



addEmp = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: addFirst => {
                if (addFirst) {
                    return true;
                } else {
                    console.log('Please enter a first name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: addLast => {
                if (addLast) {
                    return true;
                } else {
                    console.log('Please enter a last name.');
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const params = [answer.firstName, answer.lastName];

        // Get role id and role title
        const roleQuery = `SELECT role.id, role.title FROM role`;

        db.promise().query(roleQuery)
            .then(([data]) => {
                // Creates new array by destructuring & extracting id/title, then creating new obj with name & value
                // (data.map is a method that iterates over each element of the 'data' array)
                const roles = data.map(({ id, title }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is the employee's role?",
                        choices: roles
                    }
                ])
                .then(roleChoice => {
                    const role = roleChoice.role;
                    params.push(role);

                    const mgrQuery = `SELECT * FROM employee`;

                    db.promise().query(mgrQuery)
                        .then(([data]) => {
                            const mgrs = data.map(({ id, first_name, last_name }) => ({
                                name: first_name + " " + last_name,
                                value: id
                            }));

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: "Who is the employee's manager?",
                                    choices: mgrs
                                }
                            ])
                            .then(mgrChoice => {
                                const manager = mgrChoice.manager;
                                params.push(manager);

                                const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                                VALUES (?, ?, ?, ?)`;

                                return db.promise().query(query, params);
                            })
                            .then(() => {
                                console.log('Employee has been added✨');
                                viewEmp();
                            })
                            .catch(error => {
                                throw error;
                            });
                        })
                        .catch(error => {
                            throw error;
                        });
                })
                .catch(error => {
                    throw error;
                });
            })
            .catch(error => {
                throw error;
            });
    })
    .catch(error => {
        throw error;
    });
};
