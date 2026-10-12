import express from 'express';
import User from '../models/User.model.js'

const router = express.Router();

// middleware
function validateHeaders (req, res, next) {
  if (req.get("Content-Type") !== "application/json") {
    res.status(415).json({ error: 'unsupported media type'})
  }
  next()
}

// routes
router.get('/', async (req, res, next) => { res.json({ v: 1 }) })

// all of 'em
router.get('/users', async (req, res, next) => {
  try {
    let users = await User.find()
    users ? res.json(users) : res.send(404)
  } catch (err) {
    res.send(err)
  }
})

// make new
router.post('/user', validateHeaders, async (req, res, next) => {
  try {
    const { name, email, role } = req.body
    let user = new User({ name, email, role })
    
    if (error && error?.code == 1100) {
      res
    }

    await user.save()
    res.send(201)
  } catch (err) {
    res.send(err)
  }
})

// one guy
router.get('/user/:id', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id)

    if (!user) {
      res.status(404).json({ err: 'not found' })
    }
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// update
router.put('/user/:id', async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
  
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err })
  }

})

// bye-bye
router.delete('/user/:id', async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send(410)
  } catch (err) {
    res.send(err)
  }
})


export default router