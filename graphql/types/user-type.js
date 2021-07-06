const graphql = require("graphql");

const PlaylistType = require("./playlist-type");

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    audioPlaylist: { type: GraphQLList(PlaylistType) },
  }),
});

module.exports = UserType;
