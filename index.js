const express = require('express');
const mysql = require('mysql2');
const inquirer =require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Kiow@',
    database: 'employee_db'
  },
  console.log(`Connected to the database.`)
)


