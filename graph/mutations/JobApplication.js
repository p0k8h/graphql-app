const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const { mutationWithClientMutationId } = require('graphql-relay');
const VERIFY = require('./../utils/verify');

const ApplicationMutation = mutationWithClientMutationId({
    name: 'ApplicationMutation',
    inputFields: {
        jobId: { type: new GraphQLNonNull(GraphQLID) },
    },
    outputFields: {
        message: {
            type: GraphQLString,
            resolve: obj => obj.res,
        },
    },
    mutateAndGetPayload: (d, auth) => VERIFY.applyForJobs(d, auth)
        .then(res => ({ res }))
        .catch(err => new Error(err)),
});

module.exports = ApplicationMutation;
