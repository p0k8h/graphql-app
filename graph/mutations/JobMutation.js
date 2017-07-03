const {
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');

const VERIFY = require('./../utils/verify');

const JobMutation = mutationWithClientMutationId({
    name: 'JobMutation',
    inputFields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        experience: { type: new GraphQLNonNull(GraphQLString) },
        openings: { type: new GraphQLNonNull(GraphQLInt) },
        education: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: GraphQLString },
        applyBefore: { type: new GraphQLNonNull(GraphQLString) },
        salary: { type: GraphQLFloat },
    },
    outputFields: {
        message: {
            type: GraphQLString,
            resolve: obj => obj.title,
        },
    },
    mutateAndGetPayload: (data, auth) => VERIFY.verifyEmployer(data, auth).then(res => res)
        .catch(err => new Error(err)),
});

module.exports = JobMutation;
