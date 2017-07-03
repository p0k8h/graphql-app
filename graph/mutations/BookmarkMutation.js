const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const { mutationWithClientMutationId } = require('graphql-relay');
const VERIFY = require('./../utils/verify');

const BookmarkMutation = mutationWithClientMutationId({
    name: 'BookmarkMutation',
    inputFields: {
        jobId: { type: new GraphQLNonNull(GraphQLID) },
    },
    outputFields: {
        message: {
            type: GraphQLString,
            resolve: obj => obj.res,
        },
    },
    mutateAndGetPayload: (d, auth) => VERIFY.bookmarkJob(d, auth)
        .then(res => ({ res: 'bookmarked' }))
        .catch(err => new Error(err)),
});

module.exports = BookmarkMutation;
