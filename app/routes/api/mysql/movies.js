import 'dotenv/config'
import express from 'express'
import mysql from 'mysql2/promise'

const router = express.Router()

// middleware
export async function getAllMovies(req, res, next) {
  await using conn = await mysql.createConnection({
    database: process.env.MYSQL_DATABASE,
    host: 'mysql',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })
  const [results] = await conn.query('SELECT * FROM `movies`')
  // conn.end() is called automatically when leaving the scope
  req.movies = results
  next()
}

// middleware
export async function searchMovies(req, res, next) {

  await using conn = await mysql.createConnection({
    database: process.env.MYSQL_DATABASE,
    host: 'mysql',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })

  const parameter = req.query.search
  const query = `SELECT * FROM movies WHERE title LIKE ?`
  const searchValue = `%${parameter}%`

  conn.query(query, [searchValue], (err, results) => {
    if (err) {
      console.error('error executing search query:', err)
      return res.status(500).json({
        error: 'Internal server error',
      })
    }
    
    console.log(results)
    req.searchResults = results
    next()
  })
}

router.get(
  '/movies',
  searchMovies,
  getAllMovies,
  async (req, res, next) => {

  if (!req.searchResults) {
    res.json(req.movies)
  } else {
    res.json(req.searchResults)
  }
})

export const mysqlMovies = router
export default router
