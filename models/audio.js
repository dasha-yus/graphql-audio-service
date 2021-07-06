var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var audioSchema = new mongoose.Schema({
  albom: {
    type: String,
    required: true,
  },
  song: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  mp3: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  numberOfViews: {
    type: Number,
    required: true,
    default: 0,
  },
  likes: [
    {
      type: String,
    },
  ],
  comments: [
    {
      text: String,
      user: String,
      userId: String,
    },
  ],
});

module.exports = mongoose.model("Audio", audioSchema);
