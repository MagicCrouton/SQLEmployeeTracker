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
async function viewDept() {
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
  db.query('SELECT * FROM role JOIN department ON role.department_id = department.id', function (err, results) {
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
 db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', function (err, results) {
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
// function for adding a department
async function addDept() {
  await inquirer.prompt(utilities.questionIndex.addDeptQ)
  .then(async (response) => {
    // console.log(response)
    console.log('\n')
    await db.promise().query(`
    INSERT INTO department (dept_name)
    VALUES ('${response.deptName}');`)
    console.log('\n')
  })
  }


// function for adding a role
// helper function to gather list of departments
// this function deconstructs the name and id data out of the sql data and rewrites into an array of strings

var deptList
var deptMapper
async function deptFinder() {
  let tempList = await db.promise().query('SELECT * FROM department')
  // console.log(tempList)
    deptList = tempList[0].map(({dept_name}) => (
      `${dept_name}`
    ))
    // this makes an array to call the dept id later
    deptMapper = tempList[0].map(({dept_name, id}) => (
      {
      departmentID: `${id}`,
      departmentName: `${dept_name}`}))
    // console.log(deptMapper);
  }


async function addRole() {
  await inquirer.prompt([
  {
      type: "input",
      name: "roleName",
      Message: "what is the new role called?" 
  },
  {
      type: "input",
      name: "roleSalary",
      Message: "what is the salary for this Role?" 
  },
  {
      type: "list",
      Message: "what Department is this role in?",
      name: "roleDept",
      choices: deptList
  }
])
 .then(async (response) => {
  // console.log(response);
  let i = deptMapper.findIndex(x => 
    x.departmentName === response.roleDept)
  // console.log(i);
  let deptID = deptMapper[i].departmentID;
  await db.promise().query(`
  INSERT INTO role (department_id, title, salary)
  VALUES (${deptID}, ${response.roleName},${response.roleSalary});
  `)
 })
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
  else if (response.nextItem === 'add a department') {
    await addDept();
  }
  else if (response.nextItem === 'add a new role') {
    await deptFinder();
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
    console.log('\n');
    console.log('byeee');
    console.log('\n');
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