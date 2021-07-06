const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = graphql;

const PlaylistType = new GraphQLObjectType({
  name: "Playlist",
  fields: () => ({
    audioId: { type: GraphQLString },
    song: { type: GraphQLString },
    singer: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

module.exports = PlaylistType;
