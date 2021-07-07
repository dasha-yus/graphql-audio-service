const graphql = require("graphql");
const Audio = require("../../models/audio");
const User = require("../../models/user");
const AudioType = require("../types/audio-type");
const PlaylistType = require("../types/playlist-type");
const UserType = require("../types/user-type");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} = graphql;

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // getAudio: {
    //   type: AudioType,
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLString) },
    //   },
    //   resolve(parent, args) {
    //     return Audio.findByIdAndUpdate(
    //       args.id,
    //       { $inc: { numberOfViews: 1 } },
    //       { new: true }
    //     );
    //   },
    // },

    addAudio: {
      type: AudioType,
      args: {
        albom: { type: new GraphQLNonNull(GraphQLString) },
        song: { type: new GraphQLNonNull(GraphQLString) },
        singer: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        mp3: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let audio = new Audio({
          albom: args.albom,
          song: args.song,
          singer: args.singer,
          image: args.image,
          mp3: args.mp3,
          description: args.description,
        });
        return audio.save();
      },
    },

    removeAudio: {
      type: AudioType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Audio.findByIdAndRemove(args.id);
      },
    },

    updateAudio: {
      type: AudioType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        albom: { type: new GraphQLNonNull(GraphQLString) },
        song: { type: new GraphQLNonNull(GraphQLString) },
        singer: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        mp3: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Audio.findByIdAndUpdate(
          args.id,
          {
            $set: {
              albom: args.albom,
              song: args.song,
              singer: args.singer,
              image: args.image,
              description: args.description,
              mp3: args.mp3,
            },
          },
          { new: true }
        );
      },
    },

    likeAudio: {
      type: AudioType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        numberOfViews: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return Audio.findByIdAndUpdate(
          args.id,
          {
            $push: { likes: args.userId },
            $set: { numberOfViews: args.numberOfViews },
          },
          { new: true }
        );
      },
    },

    unlikeAudio: {
      type: AudioType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        numberOfViews: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return Audio.findByIdAndUpdate(
          args.id,
          {
            $pull: { likes: args.userId },
            $set: { numberOfViews: args.numberOfViews },
          },
          { new: true }
        );
      },
    },

    removeCategory: {
      type: AudioType,
      args: { albom: { type: GraphQLString } },
      resolve(parent, args) {
        return Audio.deleteMany({ albom: args.albom });
      },
    },

    addAudioToPlaylist: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        audioId: { type: new GraphQLNonNull(GraphQLString) },
        song: { type: new GraphQLNonNull(GraphQLString) },
        singer: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.userId,
          {
            $addToSet: {
              audioPlaylist: {
                audioId: args.audioId,
                song: args.song,
                singer: args.singer,
                image: args.image,
              },
            },
          },
          { new: true }
        );
      },
    },

    addComment: {
      type: AudioType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Audio.findByIdAndUpdate(
          args.id,
          {
            $push: {
              comments: {
                text: args.text,
                user: args.user,
                userId: args.userId,
              },
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = Mutation;
