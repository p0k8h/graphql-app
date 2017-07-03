const {
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLUnionType,
} = require('graphql');
const { globalIdField, connectionArgs, connectionFromPromisedArray } = require('graphql-relay');

const { nodeInterface, checkers } = require('./../interfaces');
const Job = require('./../../models/job');
const getEmployer = require('./../fetchers/nestedFecthers/Employer');
const getSeeker = require('././../fetchers/nestedFecthers/seeker');
const EmployerType = require('./EmployerType');
const _ = require('lodash');
const getFilters = require('./../utils/filter');

const JobType = new GraphQLObjectType({
    name: 'JobType',
    fields: () => {
        const connections = require('././../connections');
        return {
            id: globalIdField('JobType'),
            jobId: {
                type: GraphQLID,
                resolve: obj => obj._id,
            },
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            experience: { type: GraphQLString },
            position: { type: GraphQLString },
            openings: { type: GraphQLInt },
            location: { type: GraphQLString },
            education: { type: GraphQLString },
            postedDate: {
                type: GraphQLString,
                resolve: obj => new Date(obj.postedDate).toISOString(),
            },
            applyBefore: { type: GraphQLString },
            salary: { type: GraphQLFloat },
            employer: {
                type: new GraphQLList(EmployerType),
                resolve: obj => getEmployer(obj),
            },
            seeker: {
                type: connections.Sconnection,
                args: connectionArgs,
                resolve: (obj, args, auth) => {
                    const filterArgs = _.assign({
                        jobId: obj._id,
                    }, getFilters(args));
                    return connectionFromPromisedArray(getSeeker(obj), args)
                        .then((data) => {
                            data.args = filterArgs;
                            return data;
                        }).catch(err => err);
                },
            },
        };
    },
    interfaces: [nodeInterface],
});

checkers.push({
    model: Job,
    type: JobType,
});

module.exports = JobType;
