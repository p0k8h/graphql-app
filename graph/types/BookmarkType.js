const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
} = require('graphql');

const BookmarkType = new GraphQLObjectType({
    name: 'BookmarkType',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
    }),
});

module.exports = BookmarkType;
