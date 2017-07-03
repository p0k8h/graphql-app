const {
    GraphQLString,
    GraphQLNonNull,
} = require('graphql');
const {
    mutationWithClientMutationId,
} = require('graphql-relay');

const Seeker = require('./../../models/seeker');
const VERIFY = require('./../utils/verify');

const SeekerUpdateMutation = mutationWithClientMutationId({
    name: 'SeekerUpdateMutation',
    inputFields: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        imageLink: { type: GraphQLString },
        education: { type: GraphQLString },
        address: { type: GraphQLString },
    },
    outputFields: {
        message: {
            type: GraphQLString,
            resolve: obj => `${obj.firstName} ${obj.lastName}`,
        },
    },
    mutateAndGetPayload: (data, auth) => VERIFY.authorizedUpdate(Seeker, data, auth)
        .then(res => res)
        .catch(err => new Error(err)),
});

module.exports = SeekerUpdateMutation;
