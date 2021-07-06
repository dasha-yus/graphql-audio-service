const graphql = require("graphql");
const Audio = require("../models/audio");
const User = require("../models/user");

const AudioType = require("./types/audio-type");
const UserType = require("./types/user-type");

const Mutation = require("./mutations/audio-mutation");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } =
  graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    audio: {
      type: AudioType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Audio.findByIdAndUpdate(args.id);
      },
    },
    audios: {
      type: new GraphQLList(AudioType),
      resolve(parent, args) {
        return Audio.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
