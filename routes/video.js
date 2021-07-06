var express = require('express')
var router = express.Router()
var Video = require("../models/video")
var User = require("../models/user")
const isUser = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')

router.route('/video').get((req, res) => {
	Video.find()
		.then(videos => res.json(videos))
		.catch(err => res.status(400).json('Error: ' + err))
})

router.route('/video/:id').get((req, res) => {
	Video.findByIdAndUpdate(req.params.id, {$inc: {"numberOfViews" : 1}})
		.then(videos => res.json(videos))
		.catch(err => res.status(400).json('Error: ' + err)
	)
})

router.post('/:id/addToPlaylist', isUser, (req, res, next) => {
	Video.findById(req.params.id, {
	  $set: req.body
	}, (error, data) => {
	  if (error) {
		return next(error)
	  } else {
		res.json(data)
	  }
	})
})

router.put('/video/:id/like', isUser, (req, res) => {
	Video.findByIdAndUpdate(req.params.id, {
		$push: { likes: req.body.userId },
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

router.put('/video/:id/unlike', isUser, (req, res) => {
	Video.findByIdAndUpdate(req.params.id, {
		$pull: { likes: req.body.userId },
		$set: { "numberOfViews" : req.body.numberOfViews }
	}, {
		new: true
	}).exec((err, result) => {
		if (err) {
			return res.status(422).json({error: err})
		} else {
			res.json(result)
		}
	})
})

router.put('/video/:id/comment', isUser, (req, res) => {
	const comment = {
		text: req.body.text,
		user: req.body.user,
		userId: req.body.userId
	}
	
	Video.findByIdAndUpdate(req.params.id, {
		$push: { comments: comment }
	}, {
		new: true
	}).exec((err, result) => {
		if (err) {
			return res.status(422).json({error: err})
		} else {
			res.json(result)
		}
	})
})

router.put('/video/add/:id', isUser, (req, res) => {
	const video = {
		videoId: req.body.videoId,
		title: req.body.title,
		image: req.body.image
	}

	User.findByIdAndUpdate(req.params.id, {
		$addToSet: { videoPlaylist: video }
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

router.route('/user/:id').get((req, res) => {
	User.findById(req.params.id)
		.then(videos => res.json(videos))
		.catch(err => res.status(400).json('Error: ' + err)
	)
})

router.put('/user/:id/playlists/video', isUser, (req, res) => {
	const video = {
		videoId: req.body.videoId,
		title: req.body.title,
		image: req.body.image
	}

	User.findByIdAndUpdate(req.params.id, {
		$pull: { videoPlaylist: video }
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

router.put('/user/:id/playlists/audio', isUser, (req, res) => {
	const audio = {
		audioId: req.body.audioId,
		song: req.body.song,
		singer: req.body.singer,
		image: req.body.image
	}

	User.findByIdAndUpdate(req.params.id, {
		$pull: { audioPlaylist: audio }
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

router.put("/video/delete-category", isAdmin, (req, res) => {
	Video.deleteMany({ topic: req.body.topic }, (err, result) => {
	  if (err) {
		res.send(err)
	  } else {
		res.send(result)
	  }
	})
})

module.exports = router