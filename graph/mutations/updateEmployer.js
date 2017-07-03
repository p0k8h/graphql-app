const {
    GraphQLString,
    GraphQLInt,
} = require('graphql');
const {
    mutationWithClientMutationId,
} = require('graphql-relay');

const Employer = require('./../../models/employer');
const ENUM = require('./../enums');
const VERIFY = require('./../utils/verify');

const EmployerUpdateMutation = mutationWithClientMutationId({
    name: 'EmployerUpdateMutation',
    inputFields: {
        company: { type: GraphQLString },
        imageLink: { type: GraphQLString },
        industry: { type: ENUM.IndustryType },
        ownerShip: { type: ENUM.OwnerShipType },
        totalEmployees: { type: GraphQLInt },
        address: { type: GraphQLString },
        location: { type: ENUM.LocationType },
        phone: { type: GraphQLString },
        fax: { type: GraphQLString },
        website: { type: GraphQLString },
    },
    outputFields: {
        message: {
            type: GraphQLString,
            resolve: obj => obj.company,
        },
    },
    mutateAndGetPayload: (data, auth) => VERIFY.authorizedUpdate(Employer, data, auth)
        .then(res => res)
        .catch(err => new Error(err)),
});

module.exports = EmployerUpdateMutation;
