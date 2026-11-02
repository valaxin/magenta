import 'dotenv/config'
import express from 'express'
import mysql from 'mysql2/promise'

const router = express.Router()

export async function getAllEmployees(req, res, next) {
  try {

    // make connection
    await using conn = await mysql.createConnection({
      database: process.env.MYSQL_DATABASE,
      host: 'mysql',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    })

    // const [tables] = await conn.query(`SHOW TABLES`)
    // req.tables = tables

    const [ results ] = await conn.query('SELECT * FROM `employees`')
    req.employees = results
    

    next()
  } catch (err) {
    next(err)
  }
}

router.get('/all', getAllEmployees, async (req, res, next) => {
  try {
    res.json(req.employees);
  } catch (err) {
    res.json({ err })
  }
})

export const employeesHandler = router

export default router
