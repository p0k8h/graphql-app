const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const { mutationWithClientMutationId } = require('graphql-relay');

const Seeker = require('./../../models/seeker');
const VERIFY = require('./../utils/verify');

const SeekerMutation = mutationWithClientMutationId({
    name: 'SeekerMutation',
    inputFields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
        message: {
            type: GraphQLString,
            resolve: obj => obj.email,
        },
    },
    mutateAndGetPayload: data => new Promise((resolve, reject) => {
        VERIFY.checkEmail(data, (err, d) => {
            if (err === null) {
                Seeker.create(data, (e, r) => {
                    if (err) reject(err);
                    resolve(r);
                });
            } else {
                reject('already registered');
            }
        });
    }),
});

module.exports = SeekerMutation;
