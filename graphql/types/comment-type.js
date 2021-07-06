const graphql = require("graphql");

const UserType = require("./user-type");

const { GraphQLObjectType, GraphQLString } = graphql;

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    text: { type: GraphQLString },
    user: { type: GraphQLString },
    userId: { type: GraphQLString },
  }),
});

module.exports = CommentType;
