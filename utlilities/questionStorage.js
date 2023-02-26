// question storage for reference with inquirer
// const mysql = require('mysql2');

// require('dotenv').config();

// const db = mysql.createConnection(
//   {
//     host: `${process.env.db_host}`,
//     user: `${process.env.user_name}`,
//     password: `${process.env.sql_PW}`,
//     database: `${process.env.db}`
//   },
//   )

// const dept = async () => {
//    let deptList = await db.promise().query('SELECT * FROM dept');
//    return deptList
// } 

// console.log(dept());


const questionIndex = {
    initialQ: [{
        message: 'What would you like to do?',
        type: 'list',
        name: 'nextItem',
        choices: [
        'View departments', 
        'View Roles', 
        'View Employees',
        'add a department', 
        'add a new role', 
        'add a new employee',
        'update an Employees Role',
        'quit']
    }],
    addDeptQ: [{
        type: "input",
        name: "deptName",
        Message: "what is the name of the new department?"
    }]
    // addRoleQ: [
    //     {
    //         type: "input",
    //         name: "roleName",
    //         Message: "what is the new role called?" 
    //     },
    //     {
    //         type: "input",
    //         name: "roleSalary",
    //         Message: "what is the salary for this Role?" 
    //     },
    //     {
    //         type: "list",
    //         Message: "what Department is this role in?",
    //         name: "roleDept",
    //         choices: ``
    //     }
//     addEmployeeQ: [
//         {
//             type: "input",
//             name: "FirstName",
//             Message: "what the new Employees First Name?" 
//         },
//         {
//             type: "input",
//             name: "lastName",
//             Message: "what the new Employees last Name?" 
//         },
//         {
//             type: "input",
//             name: "employeeRole",
//             Message: "what the new Employees role?" 
//         },
//         {
//             type: "input",
//             name: "employeeManager",
//             Message: "who is the employees manager?" 
//         },                      
// ],
//     updateEmployeeRoleQ: [],
}

module.exports = {questionIndex};