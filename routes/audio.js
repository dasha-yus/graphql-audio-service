var express = require('express')
var router = express.Router()
var Audio = require("../models/audio")
var User = require("../models/user")
const isUser = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')

router.route('/').get((req, res) => {
	Audio.find()
		.then(audios => res.json(audios))
		.catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
	Audio.findByIdAndUpdate(req.params.id, { $inc: { "numberOfViews" : 1 } })
		.then(audios => res.json(audios))
		.catch(err => res.status(400).json('Error: ' + err)
	)
})

router.put('/:id/like', isUser, (req, res) => {
	Audio.findByIdAndUpdate(req.params.id, {
		$push:{ likes: req.body.userId },
		$set: { "numberOfViews" : req.body.numberOfViews }
	}, {
		new: true
	}).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err })
		} else {
			res.json(result)
		}
	})
})

router.put('/:id/unlike', isUser, (req, res) => {
	Audio.findByIdAndUpdate(req.params.id, {
		$pull: { likes: req.body.userId },
		$set: { "numberOfViews" : req.body.numberOfViews }
	}, {
		new: true
	}).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err })
		} else {
			res.json(result)
		}
	})
})

router.put('/:id/comment', isUser, (req, res) => {
	const comment = {
		text: req.body.text,
		user: req.body.user,
		userId: req.body.userId
	} 

	Audio.findByIdAndUpdate(req.params.id, {
		$push:{comments: comment}
	}, {
		new: true
	}).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err })
		} else {
			res.json(result)
		}
	})
})

router.put('/add/:userId', isUser, (req, res) => {
	const audio = {
		audioId: req.body.audioId,
		song: req.body.song,
		singer: req.body.singer,
		image: req.body.image
	}

	User.findByIdAndUpdate(req.params.userId, {
		$addToSet: { audioPlaylist: audio }
	}, {
		new: true
	}).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err })
		} else {
			res.json(result)
		}
	})
})

router.put("/delete-category", isAdmin, (req, res) => {
	Audio.deleteMany({ albom: req.body.albom }, (err, result) => {
	  if (err) {
		res.send(err)
	  } else {
		res.send(result)
	  }
	})
})

module.exports = router
