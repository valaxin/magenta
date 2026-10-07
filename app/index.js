import dotenv from 'dotenv'
import express from 'express'
import { connect } from 'mongoose'
import logger from 'morgan'

import Users from './models/Users.model.js'

dotenv.config({ path: './../.env' });

connect(process.env.MONGO_URL)

const app = express()
app.use(logger('dev'))

app.get('/', async (req, res, next) => { res.json({ message: req.status }) })

// middleware...
async function dbInteraction_FIND_MW (req, res, next) {
  req.user = {
    message: 'hello from middleware'
  }
  next()
}

app.get('/all', dbInteraction_FIND_MW, async (req, res, next) => {
  try {
    let users = await Users.find()
    console.log(users)
    res.json({ msg: req.user.message, users })
  } catch (err) {
    res.status(500).json({ message: 'failure' })
  }
})

app.listen(3000, (err) => {
  if (err) console.log(err)
})
