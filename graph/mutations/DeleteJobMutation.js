const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql');

const {
    mutationWithClientMutationId,
} = require('graphql-relay');

const verifyAdmin = require('././../utils/verify');

const DeleteJobMutation = mutationWithClientMutationId({
    name: 'DeleteJob',
    inputFields: {
        jobId: { type: new GraphQLNonNull(GraphQLID) },
    },
    outputFields: {
        message: {
            type: GraphQLString,
            resolve: obj => obj.result,
        },
    },
    mutateAndGetPayload: (d, auth) => verifyAdmin.deleteJob(d, auth).then((result) => {
        return { result };
    }).catch(err => new Error(err)),
});

module.exports = DeleteJobMutation;
