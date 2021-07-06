const graphql = require("graphql");

const UserType = require("./user-type");
const CommentType = require("./comment-type");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } =
  graphql;

const AudioType = new GraphQLObjectType({
  name: "Audio",
  fields: () => ({
    id: { type: GraphQLString },
    albom: { type: GraphQLString },
    song: { type: GraphQLString },
    singer: { type: GraphQLString },
    image: { type: GraphQLString },
    mp3: { type: GraphQLString },
    description: { type: GraphQLString },
    numberOfViews: { type: GraphQLInt },
    likes: { type: GraphQLList(UserType) },
    comments: { type: GraphQLList(CommentType) },
  }),
});

module.exports = AudioType;
