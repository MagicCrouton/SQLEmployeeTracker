const mysql = require('mysql2');
const inquirer =require('inquirer');
const cTable = require('console.table');
const utilities = require('./utlilities/questionStorage.js');
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
     console.table(results);
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
     console.table(results);
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
    // await
    // let rolTemp = db.promise().query('SELECT * FROM role')
    // results.forEach((element) => {
    //   let tempIndex = findIndex(rolTemp, rolTemp.id === element.role_id)
    //   element.role_id = rolTemp[tempIndex].title;
    // })
    console.table(results);
  }
}) 
}
// function for add a role
async function addRole(roleInput) {
 await inquirer.prompt(utilities.questionIndex.addroleQ)
 }
// function for add an employee
async function addEmployee(firstName, lastName,) {
  await inquirer.prompt(utilities.questionIndex.addEmployeeQ)
}
// function for update employee role
async function updateEmployeeRole(roleInput) {
  await inquirer.prompt(utilities.questionIndex.updateEmployeeRoleQ)
}

async function init () {
inquirer.prompt(utilities.questionIndex.initialQ).then(async (response) => {
  if (response.nextItem === 'View departments') {
    await viewDept();
    init();
  }
  else if (response.nextItem === 'View Roles') {
    await viewRoles();
    init();
  }
  else if (response.nextItem === 'View Employees') {
    await viewEmployees();
    init();
  }
  else if (response.nextItem === 'add a new role') {
    await addRole();
    init();
  }
  else if (response.nextItem === 'add a new employee') {
    await addEmployee();
    init();
  }
  else if (response.nextItem === 'update an Employees Role') {
    await updateEmployeeRole();
    init();
  }
  else {
    console.log('oops something went wrong');
  }
  })}

  init();
