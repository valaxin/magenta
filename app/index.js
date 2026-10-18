import dotenv from 'dotenv'
import express from 'express'
import { connect } from 'mongoose'
import logger from 'morgan'
import { mongoUsers, getAllUsers } from './routes/mongo-user.js'
import { mysqlMovies, getAllMovies } from './routes/mysql-movies.js'

dotenv.config({ path: './../.env' });

connect(process.env.MONGO_URL)

const app = express()
app.use(logger('dev'))
app.use(express.json());
app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', async (req, res, next) => {
  res.render('index', {
    title: `magenta`,
    subtitle: `simple little javascript app`
  })
})

app.get('/movies', getAllMovies, async(req, res, next) => {
  res.render('index', { movies: req.movies })
})

app.get('/users', getAllUsers, async(req, res, next) => {
  res.render('index', { users: req.users })
})

app.use('/api/v1/mongo', mongoUsers)
app.use('/api/v1/mysql', mysqlMovies)

app.listen(3000, (err) => {
  if (err) console.log(err)
})
