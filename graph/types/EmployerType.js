const {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
} = require('graphql');
const { globalIdField } = require('graphql-relay');

const ENUM = require('./../enums');
const { nodeInterface, checkers } = require('./../interfaces');

const Employer = require('./../../models/employer');
const getJob = require('././../fetchers/nestedFecthers/empJob');

const EmployerType = new GraphQLObjectType({
    name: 'EmployerType',
    fields: () => {
        const JobType = require('././JobType');
        return {
            id: globalIdField('EmployerType', obj => obj._id),
            userId: {
                type: GraphQLID,
                resolve: obj => obj._id,
            },
            company: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            imageLink: { type: GraphQLString },
            industry: { type: ENUM.IndustryType },
            ownerShip: { type: ENUM.OwnerShipType },
            totalEmployees: { type: GraphQLInt },
            address: { type: GraphQLString },
            location: { type: ENUM.LocationType },
            phone: { type: GraphQLString },
            fax: { type: GraphQLString },
            website: { type: GraphQLString },
            jobs: {
                type: new GraphQLList(JobType),
                resolve: obj => getJob(obj),
            },
        };
    },
    interfaces: [nodeInterface],
});

checkers.push({
    model: Employer,
    type: EmployerType,
});

module.exports = EmployerType;
