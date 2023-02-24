// question storage for reference with inquirer

const questionIndex = {
    initialQ: [{
        type: 'list',
        message: 'What would you like to do?',
        name: 'nextItem',
        choices: [
        'View departments', 
        'View Roles', 
        'View Employees', 
        'add a new role', 
        'add a new employee',
        'update an Employees Role',
        'quit']
    }],
    addRollQ: [],
    addEmployeeQ: [],
    updateEmployeeRoleQ: [],
}

module.exports = {questionIndex};