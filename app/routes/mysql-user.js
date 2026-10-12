import express from 'express'
import User from '../models/User.model.js'

const router = express.Router()

router.get('/users', async (req, res, next) => {
  res.json({ message: 'not implimented' })
})

export default router
