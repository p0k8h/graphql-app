const {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
} = require('graphql');
const {
    connectionArgs,
    connectionFromPromisedArray,
} = require('graphql-relay');

const _ = require('lodash');
const getFilters = require('./../utils/filter');

const ApplicationType = require('././JobApplicantType');

const getJobs = require('./../fetchers/Jobs');
const getSeekers = require('./../fetchers/Seeker');
const getEmployers = require('./../fetchers/Employer');
const getApplicants = require('./../fetchers/Applicants');

const connections = require('././../connections');

const Viewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        job: {
            type: connections.JobConnection,
            args: _.assign({
                _id: { type: GraphQLID },
                employerId: { type: GraphQLID },
                title: { type: GraphQLString },
                location: { type: GraphQLString },
                education: { type: GraphQLString },
            }, connectionArgs),
            resolve: (obj, args, auth, fieldASTs) => {
                const filterArgs = getFilters(args) || {};
                return connectionFromPromisedArray(getJobs(filterArgs, fieldASTs), args).then((data) => {
                    data.args = filterArgs;
                    return data;
                }).catch(err => new Error(err));
            },
        },
        employer: {
            type: connections.EmployerConnection,
            args: _.assign({
                _id: { type: GraphQLID },
                totalSelected: { type: GraphQLInt },
                totalShortlisted: { type: GraphQLInt },
            }, connectionArgs),
            resolve: (obj, args, auth, fieldASTs) => {
                if (auth.token !== null || undefined) {
                    const filterArgs = getFilters(args) || {};
                    return connectionFromPromisedArray(getEmployers(filterArgs), args).then((data) => {
                        data.args = filterArgs;
                        return data;
                    }).catch(err => new Error(err));
                }
                throw new Error('Not authorized to see this list');
            },
        },
        seeker: {
            type: connections.SeekerConnection,
            args: _.assign({
                _id: { type: GraphQLID },
            }, connectionArgs),
            resolve: (obj, args, auth, fieldASTs) => {
                if (auth.token !== null || undefined) {
                    const filterArgs = getFilters(args) || {};
                    return connectionFromPromisedArray(getSeekers(filterArgs, fieldASTs), args).then((data) => {
                        data.args = filterArgs;
                        return data;
                    }).catch(err => new Error(err));
                }
                throw new Error('Not authorized to see this list');
            },
        },
        application: {
            type: ApplicationType,
            args: connectionArgs,
            resolve: (obj, args, auth, fieldASTs) => getApplicants()
                .then(data => data).catch(err => new Error(err)),
        },
    }),
});

module.exports = Viewer;
