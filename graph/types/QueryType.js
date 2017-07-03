const {
    GraphQLObjectType,
} = require('graphql');

const ViewerType = require('././ViewerType');
const { nodeField } = require('./../interfaces');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        node: nodeField,
        viewer: {
            type: ViewerType,
            resolve: () => ViewerType,
        },
    }),
});

module.exports = RootQuery;
