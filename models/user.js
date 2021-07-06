var mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
        required: true
    },
    videoPlaylist: [{
        videoId: {
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
        _id: false
    }],
    audioPlaylist: [{
        audioId: {
            type: String,
            required: true
        },
        song: {
            type: String,
            required: true
        },
        singer: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        _id: false
    }]
})

module.exports = mongoose.model("User", userSchema)
