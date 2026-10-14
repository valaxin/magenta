import 'dotenv/config'
import express from 'express'
import mysql from 'mysql2/promise'

const router = express.Router()

router.get('/users', async (req, res, next) => {
  await using conn = await mysql.createConnection({
    database: process.env.MYSQL_DATABASE,
    host: 'mysql',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })

  const [rows, fields] = await conn.execute('select ?+? as sum', [2, 2])
  // conn.end() is called automatically when leaving the scope

  res.json({ rows, fields })
})

export default router
