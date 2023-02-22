const mysql = require('mysql2');
const inquirer =require('inquirer');
const cTable = require('console.table');
const questionIndex = require('./utlilities/questionIndex')
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
function viewRoles() {
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
function viewEmployees() {
 db.query('SELECT * FROM employee', function (err, results) {
  if (err) {
    console.log(err)
  }
  else{
    console.table(results);
  }
}) 
}
// function for add a role
async function addRole(roleInput) {
 await inquirer.prompt(utilities.questionIndex.addroleQ)
 }
// function for add an employee
async function addEmployee(employeeInput) {
  await inquirer.prompt(utilities.questionIndex.addEmployeeQ)
}
// function for update employee role
async function updateEmployeeRole(roleInput) {
  await inquirer.prompt(utilities.questionIndex.updateEmployeeRoleQ)
}


