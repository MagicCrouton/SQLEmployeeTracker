const mysql = require("mysql2")
const fs = require("fs")
require("dotenv").config()


const schemaStage = fs.readFileSync("./db/schema.sql", {
    encoding: "utf-8",
})
const seedStage = fs.readFileSync("./db/seed.sql", {
  encoding: "utf-8",
})

const db = mysql.createConnection(
    {
    host: `${process.env.db_host}`,
    user: `${process.env.user_name}`,
    password: `${process.env.sql_PW}`,
    // database: `${process.env.db}`
  },
  console.log(`Connected to the database.`)
)

// run schema
db.query(schemaStage, function (err, results){
    if (err) {
        console.log(err)
    }
    else {
        console.log(results)}
})

const seeddb = mysql.createConnection(
    {
    host: `${process.env.db_host}`,
    user: `${process.env.user_name}`,
    password: `${process.env.sql_PW}`,
    database: `${process.env.db}`
  },
  console.log(`Connected to the database.`)
)

// run seed
seeddb.query(seedStage, function (err, results){
    if (err) {
        console.log(err)
    }
    else {
        console.log(results)}
})