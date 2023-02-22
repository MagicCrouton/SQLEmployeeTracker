const express = require('express');
const mysql = require('mysql2');
const inquirer =require('inquirer');
const cTable = require('console.table');
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


