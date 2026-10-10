import dotenv from 'dotenv'
import express from 'express'
import { connect } from 'mongoose'
import logger from 'morgan'

import simpleAPI from './routes/simple-api.js'

dotenv.config({ path: './../.env' });

connect(process.env.MONGO_URL)

const app = express()
app.use(logger('dev'))
app.use(express.json());

app.get('/', async (req, res, next) => { res.json({ status: req.status }) })

app.use('/api/v1', simpleAPI)

app.listen(3000, (err) => {
  if (err) console.log(err)
})
