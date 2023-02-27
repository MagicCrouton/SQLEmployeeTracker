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
  VALUES (${deptID}, '${response.roleName}',${response.roleSalary});
  `)
 })
 }

 var roleList
 var roleMapper
//  var managerID
 var employeeList
//  var managerList
// helper function for finding roles
 async function roleFinder() {
  let tempList = await db.promise().query('SELECT * FROM role')
  // console.log(tempList)
    roleList = tempList[0].map(({id, title, salary, deptartment_id}) => (
      `${title}`
    ))
    // this makes an array to call the role id later
    roleMapper = tempList[0].map(({id, title, salary, deptartment_id}) => (
      {
      roleID: `${id}`,
      roleTitle: `${title}`,
    }
    ))
    let tempEList = await db.promise().query('SELECT * FROM employee JOIN role ON employee.role_id = role.id')
      employeeList = tempEList[0].map(({id, role_id, first_name, title}) => (
          `${id} ${first_name} , role:${title}, roleID: ${role_id}`
      ))
    // console.log(deptMapper);
  }


// function for add an employee
async function addEmployee() {
  await inquirer.prompt([
  {
      type: "input",
      name: "firstName",
      Message: "what is the new role called?" 
  },
  {
      type: "input",
      name: "lastName",
      Message: "what is the salary for this Role?" 
  },
  {
      type: "list",
      Message: "what Department is this role in?",
      name: "employeeRole",
      choices: roleList
  },
  {
    type: "list",
    Message: "who is this employees manager?",
    name: "employeeManager",
    choices: employeeList
  }
])
.then(async (response) => {
 // console.log(response);
 let i = roleMapper.findIndex(x => 
   x.roleTitle === response.employeeRole)
 console.log(i);
 let roleID = roleMapper[i].roleID;
 let managerID = response.employeeManager.split(' ')[0];
 let managerName = response.employeeManager.split(' ')[1];

 await db.promise().query(`
 INSERT INTO employee (role_id, first_name, last_name, manager_id, manager_name)
 VALUES (${roleID},'${response.firstName}','${response.lastName}', ${managerID}, '${managerName}');
 `)
})
}

// function for update employee role
async function roleFinder() {
  let tempList = await db.promise().query('SELECT * FROM role')
  // console.log(tempList)
    roleList = tempList[0].map(({id, title, salary, deptartment_id}) => (
      `${title}`
    ))
    // this makes an array to call the role id later
    roleMapper = tempList[0].map(({id, title, salary, deptartment_id}) => (
      {
      roleID: `${id}`,
      roleTitle: `${title}`,
    }
    ))
    let tempEList = await db.promise().query('SELECT * FROM employee JOIN role ON employee.role_id = role.id')
      employeeList = tempEList[0].map(({id, role_id, first_name, title}) => (
          `${id} ${first_name} , role:${title}, roleID: ${role_id}`
      ))
    // console.log(deptMapper);
  }


// function for add an employee
async function updateEmployeeRole() {
  await inquirer.prompt([
  {
    type: "list",
    Message: "who's role do you wish to update?",
    name: "updateTarget",
    choices: employeeList
  },
  {
    type: "list",
    Message: "to what role should the employee be updated to?",
    name: "updateRequest",
    choices: roleList
  }
])
.then(async (response) => {
 // console.log(response);
 let employeeID = response.updateTarget.split(' ')[0];
 let i = roleMapper.findIndex(x => 
   x.roleTitle === response.updateRequest)
//  console.log(i);
 let roleID = roleMapper[i].roleID;

 await db.promise().query(`
UPDATE employee SET role_id = ${roleID} WHERE id = ${employeeID}
 `)
})
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
    await roleFinder();
    await addEmployee();
  }
  else if (response.nextItem === 'update an Employees Role') {
    await deptFinder();
    await roleFinder();
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

runProgram()