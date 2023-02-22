const mysql = require("mysql2")
const fs = require("fs")
const bcrypt = require("bcryptjs")
require("dotenv").config()


const schemaStage = fs.readFileSync("./db/schema.sql", {
    encoding: "utf-8",
})
const seedStage = fs.readFileSync("./db/seed.sql", {
  encoding: "utf-8",
})

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

db.connect()

// Generate random password for initial admin user
const psw = Math.random()
  .toString(36)
  .substring(2)
const hash = bcrypt.hashSync(psw, 10)

console.log("Running SQL seed...")

// Run seed query
connection.query(seedQuery, [hash], err => {
  if (err) {
    throw err
  }

  console.log("SQL seed completed! Password for initial admin account: " + psw)
  connection.end()
})