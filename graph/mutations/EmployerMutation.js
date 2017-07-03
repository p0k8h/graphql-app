const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const { mutationWithClientMutationId } = require('graphql-relay');

const Employer = require('./../../models/employer');
const VERIFY = require('./../utils/verify');

const EmployerMutation = mutationWithClientMutationId({
    name: 'EmployerMutation',
    inputFields: {
        company: { type: GraphQLString },
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
                Employer.create(data, (e, r) => {
                    if (err) reject(err);
                    resolve(r);
                });
            } else {
                reject('already registered');
            }
        });
    }),
});

module.exports = EmployerMutation;
