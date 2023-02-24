const mysql = require('mysql2');
const inquirer =require('inquirer');
const cTable = require('console.table');
const utilities = require('./utlilities/questionStorage.js');
// var endProgram = false;
require('dotenv').config();

const db = mysql.createConnection(
  {
  host: `${process.env.db_host}`,
  user: `${process.env.user_name}`,
  password: `${process.env.sql_PW}`,
  database: `${process.env.db}`
},
console.log(`Connected to the database.`)
)

// function for view all departments
function viewDept() {
  db.query('SELECT * FROM department', function (err, results) {
   if (err) {
     console.log(err)
   }
   else{
     console.log('\n');
     console.table(results);
     console.log('\n');
   }
 }) 
 }
// function for view all roles
async function viewRoles() {
  db.query('SELECT * FROM role', function (err, results) {
   if (err) {
     console.log(err)
   }
   else{
    console.log('\n');
     console.table(results);
     console.log('\n');
   }
 })
 }
// function for view all employees
async function viewEmployees() {
 db.query('SELECT * FROM employee', function (err, results) {
  if (err) {
    console.log(err)
  }
  else{
    console.log('\n');
    console.table(results);
    console.log('\n');
  }
}) 
}
// function for add a role
async function addRole() {
 await inquirer.prompt(utilities.questionIndex.addroleQ)
 }
// function for add an employee
async function addEmployee() {
  await inquirer.prompt(utilities.questionIndex.addEmployeeQ)
}
// function for update employee role
async function updateEmployeeRole() {
  await inquirer.prompt(utilities.questionIndex.updateEmployeeRoleQ)
}

const runProgram = async () => {
let endProgram = false;
while (endProgram===false)
await inquirer.prompt(utilities.questionIndex.initialQ).then(async (response) => {
  if (response.nextItem === 'View departments') {
    await viewDept();
  }
  else if (response.nextItem === 'View Roles') {
    await viewRoles();
  }
  else if (response.nextItem === 'View Employees') {
    await viewEmployees();
  }
  else if (response.nextItem === 'add a new role') {
    await addRole();
  }
  else if (response.nextItem === 'add a new employee') {
    await addEmployee();
  }
  else if (response.nextItem === 'update an Employees Role') {
    await updateEmployeeRole();
  }
  else if (response.nextItem === 'quit') {
    endProgram = true;
    console.log('byeee');
    process.exit();
  }
  else {
    console.log('you broke it, big sad :(');
  }
  })}

  // const runProgram = async () => {
  //   while(endProgram === false) {
  //     choicePrompt();
  //   }
  // }
// async function init(endProgram) {
//     await choicePrompt();
//     if (endProgram) {
//       console.log('buh bye');
//     }
//     else {
//       await init(endProgram);
//     }
//   };

//   init(endProgram);

// while(endProgram === false) async () => {
//   await choicePrompt();
// }

runProgram()