const Video = require("./models/video");
const Audio = require("./models/audio");
const User = require("./models/user");
const fs = require("fs");

let videos = []
let audios = []
let users = []

fs.readFile("./data/videos.json", (err, data) => {
  if (err) throw err;
  videos = JSON.parse(data);
});

fs.readFile("./data/audios.json", (err, data) => {
  if (err) throw err;
  audios = JSON.parse(data);
});

fs.readFile("./data/users.json", (err, data) => {
  if (err) throw err;
  // passwords:
  // admin: 1234567
  // user: 12345
  users = JSON.parse(data);
});

function seedDB(){
	Video.remove({}, err => {
		if(err) console.log(err);
		console.log("removed posts!");
		videos.forEach(seed => {
			Video.create(seed, (err, videos) => {
				if(err) {
					console.log(err)
				} else {
					console.log("added a video post");
				}
			});
		});
	});
	
	Audio.remove({}, err => {
		if(err) console.log(err);
		console.log("removed posts!");
		audios.forEach(seed => {
			Audio.create(seed, (err, audios) => {
				if(err) {
					console.log(err)
				} else {
					console.log("added an audio post");
				}
			});
		});
	});

	User.remove({}, err => {
		if(err) console.log(err);
		console.log("removed users!");
		users.forEach(seed => {
			User.create(seed, (err, users) => {
				if(err) {
					console.log(err)
				} else {
					console.log("added a user");
				}
			});
		});
    });
}

module.exports = seedDB;