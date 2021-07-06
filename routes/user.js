const express = require('express')
const router = express.Router()
const User = require('../models/user')
const isAdmin = require('../middleware/isAdmin')

router.put('/edit/:id', isAdmin, (req, res, next) => {
	User.findByIdAndUpdate(req.params.id, {
	  $set: req.body
	}, (error, data) => {
	  if (error) {
		return next(error)
	  } else {
		res.json(data)
	  }
	})
})

router.delete('/delete/:id', isAdmin, (req, res, next) => {
	User.findByIdAndRemove(req.params.id, (error, data) => {
	  if (error) {
		return next(error)
	  } else {
		res.status(200).json({ msg: data })
	  }
	})
})

module.exports = router
