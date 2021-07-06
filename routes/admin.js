var express = require('express')
var router = express.Router()
var User = require("../models/user")
var Video = require("../models/video")
var Audio = require("../models/audio")
const isAdmin = require('../middleware/isAdmin')

router.get('/users', isAdmin, (req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err))
})

router.get('/users/:id', isAdmin, (req, res) => {
	User.findById(req.params.id)
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err))
})

router.post('/new', isAdmin ,async (req, res) => {
	Video.create(req.body, (error, data) => {
		if (error) {
		  return next(error)
		} else {
		  res.json(data)
		}
	})
})

router.put('/edit/:id', isAdmin, (req, res, next) => {
	Video.findByIdAndUpdate(req.params.id, {
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
	Video.findByIdAndRemove(req.params.id, (error, data) => {
	  if (error) {
		return next(error)
	  } else {
		res.status(200).json({ msg: data })
	  }
	})
})

// router.post('/audio/new', isAdmin, async (req, res, next) => {
// 	Audio.create(req.body, (error, data) => {
// 		if (error) {
// 		  return next(error)
// 		} else {
// 		  res.json(data)
// 		}
// 	})
// })

// router.put('/audio/edit/:id', isAdmin, (req, res, next) => {
// 	Audio.findByIdAndUpdate(req.params.id, {
// 	  $set: req.body
// 	}, (error, data) => {
// 	  if (error) {
// 		return next(error)
// 	  } else {
// 		res.json(data)
// 	  }
// 	})
// })

// router.delete('/audio/delete/:id', isAdmin, (req, res, next) => {
// 	Audio.findByIdAndRemove(req.params.id, (error, data) => {
// 	  if (error) {
// 		return next(error);
// 	  } else {
// 		res.status(200).json({ msg: data })
// 	  }
// 	})
// })

module.exports = router