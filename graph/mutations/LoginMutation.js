const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const { mutationWithClientMutationId } = require('graphql-relay');

const JWT = require('./../../config/jwt');

const LoginMutation = mutationWithClientMutationId({
    name: 'LoginMutation',
    inputFields: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    outputFields: {
        token: {
            type: GraphQLString,
            resolve: obj => obj.res,
        },
    },
    mutateAndGetPayload: data => JWT.login(data).then(res => ({ res }))
    .catch(err => new Error(err)),
});

module.exports = LoginMutation;
