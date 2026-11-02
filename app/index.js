import dotenv from 'dotenv'
import express from 'express'
import { connect } from 'mongoose'
import logger from 'morgan'
import { ExpressAuth } from '@auth/express'
import GitHub from '@auth/express/providers/github'

import { mongoUsers, getAllUsers } from './routes/api/mongo/user.js'
import { mysqlMovies, getAllMovies } from './routes/api/mysql/movies.js'
import { employeesHandler, getAllEmployees } from './routes/api/mysql/employees.js'

import * as locals from './public/app.json' with { type: 'json' }

dotenv.config({ path: './../.env' })

connect(process.env.MONGO_URL)

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.static('public'))
app.set('trust proxy', true)
app.set('view engine', 'pug')

app.use('/auth/{*splat}', ExpressAuth({ providers: [GitHub] }))

app.get('/', async (req, res, next) => {
  res.render('index', {
    title: `magenta`,
    subtitle: `simple little javascript app`,
  })
})

app.get('/locals', async (req, res) => {
  res.json(locals)
})

//

app.get('/movies', getAllMovies, async (req, res, next) => {
  res.render('index', { movies: req.movies })
})

app.get('/users', getAllUsers, async (req, res, next) => {
  res.render('index', { users: req.users })
})

app.use('/api/v1/users', mongoUsers)
app.use('/api/v1/movies', mysqlMovies)
// app.use('/api/v1/employees', employeesHandler)

app.listen(3000, (err) => {
  if (err) console.log(err)
})
