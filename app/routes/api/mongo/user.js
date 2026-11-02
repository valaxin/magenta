import express from 'express'
import User from '../../../models/User.model.js'

const router = express.Router()

// Full CRUD operations available here

// middleware
function validateHeaders(req, res, next) {
  if (req.get('Content-Type') !== 'application/json') {
    res.status(415).json({ error: 'unsupported media type' })
  }
  next()
}

// sanatize input
// const sanitizeInput = (value) => {
//   if (typeof value !== 'string') return ''
//   return value
//     .trim() // bye-bye whitespace
//     .slice(0, 100) // bye-bye length
//     .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // bye-bye special/escape character
// }

// 1.
export async function getAllUsers(req, res, next) {
  try {
    let users = await User.find()
    req.users = users
    next()
  } catch (err) {
    next(err)
  }
}

export async function keywordSearch(req, res, next) {
  try {
    let query = req.query.q
    let results = await User.find({
      $or: [{ name: { $regex: query, $options: 'i' } }, { role: { $regex: query, $options: 'i' } }],
    })

    req.searchResults = results
    next()
    // ...
  } catch (err) {
    next(err)
  }
}

// api
router.get('/', async (req, res, next) => {
  res.json({ v: 1 })
})

// all of 'em
router.get('/all', getAllUsers, async (req, res, next) => {
  res.json(req.users)
})

// search for one by "keyword"
router.post('/search', validateHeaders, keywordSearch, async (req, res, next) => {
  try {

    console.log('SEARCHING!!!')

    res.json(req.searchResults)
  } catch (err) {
    res.json(err)
  }
})

// make new
router.post('/new', validateHeaders, async (req, res, next) => {
  try {
    let { name, email, role } = req.body
    let user = new User({ name, email, role })
    await user.save()

    res.json({ id: user.id })
  } catch (err) {
    res.json(err)
  }
})

// dynamic routes

// one guy
router.get('/:id', async (req, res, next) => {
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
router.put('/:id', async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true })

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// bye-bye
router.delete('/:id', async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.send(410)
  } catch (err) {
    res.send(err)
  }
})

export const mongoUsers = router

export default router
