import 'dotenv/config'
import express from 'express'
import mysql from 'mysql2/promise'

const router = express.Router()

export async function getAllMovies(req, res, next) {
  await using conn = await mysql.createConnection({
    database: process.env.MYSQL_DATABASE,
    host: 'mysql',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })
  const [ results ] = await conn.query('SELECT * FROM `movies`')
  
  // conn.end() is called automatically when leaving the scope
  
  req.movies = results
  next()
}

router.get('/movies', getAllMovies, async (req, res, next) => {
  res.json(req.movies)
})

export const mysqlMovies = router

export default router
