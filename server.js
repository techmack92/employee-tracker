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
    console.log('Connected to the emp_db database ✅')
);
db.connect(err => {
    if (err) throw err;
    console.log('Connected 🔗');
    welcomeHeader();
})

welcomeHeader = () => {
    console.log("***********************************")
    console.log("*                                 *")
    console.log("*        EMPLOYEE TRACKER         *")
    console.log("*                                 *")
    console.log("***********************************")
    promptUser();
}