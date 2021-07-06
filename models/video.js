const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

var videoSchema = new mongoose.Schema({
	topic: {
        type: String,
        required: true
    },
	title: {
        type: String,
        required: true
    },
	image: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    numberOfViews: {
        type: Number,
        required: true,
        default: 0
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    comments: [{
        text: String,
        user: String,
        userId: String
    }]
})

module.exports = mongoose.model("Video", videoSchema)
