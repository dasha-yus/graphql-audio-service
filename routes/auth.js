const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const User = require('../models/user')
const config = require('config')

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, passwordCheck } = req.body

    if (!email || !password || ! passwordCheck) {
      return res.status(400).json({ msg: "Some fields are not filled" })
    }  
    if (password.length < 5) {
      return res.status(400).json({ msg: "The password needs to be at least 5 characters long" })
    }
    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Passwords does not match" })
    }

    const existingUser = await User.findOne({email: email})
    if (existingUser) {
      return res.status(400).json({ msg: "An account with this email already exists" })
    }
    if (!name) name = email
    
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      password: passwordHash,
      name,
    })
    const savedUser = newUser.save()
    res.json(savedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ msg: "Some fields are not filled" })
    }

    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ msg: "No such account" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({ msg: "Incorrect password" })
    const token = jwt.sign({ id: user._id, role: user.role }, config.get('JWT_SECRET'), { expiresIn: 3600 })
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/delete', auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user)
    res.json(deletedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header('x-auth-token')
    if(!token) return res.json(false)

    const verified = jwt.verify(token,  process.env.JWT_SECRET)
    if(!verified) return res.json(false)

    const user = await User.findById(verified.id)
    if(!user) return res.json(false)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user)
  res.json({
    name: user.name,
    id: user._id
  })
})

module.exports = router