const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
} = require('graphql');

const {
    globalIdField,
    connectionArgs,
    connectionFromPromisedArray,
} = require('graphql-relay');
const _ = require('lodash');

const getFilters = require('./../utils/filter');

const { nodeInterface, checkers } = require('./../interfaces');
const Seeker = require('./../../models/seeker');
const jobFetcher = require('././../fetchers/nestedFecthers/Jobs');
const bookmarkFetcher = require('././../fetchers/nestedFecthers/bookmark');

const SeekerType = new GraphQLObjectType({
    name: 'SeekerType',
    fields: () => {
        const connections = require('././../connections');
        return {
            id: globalIdField('SeekerType', obj => obj._id),
            userId: {
                type: GraphQLID,
                resolve: obj => obj._id,
            },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            imageLink: { type: GraphQLString },
            education: { type: GraphQLString },
            address: { type: GraphQLString },
            jobs: {
                type: connections.ApplicantConnection,
                args: connectionArgs,
                resolve: (obj, args) => {
                    const filterArgs = _.assign({
                        seekerId: obj._id,
                    }, getFilters(args));
                    return connectionFromPromisedArray(jobFetcher(obj), args)
                        .then((data) => {
                            data.args = filterArgs;
                            return data;
                        }).catch(err => err);
                },
            },
            bookmarks: {
                type: connections.BookmarkConnection,
                args: connectionArgs,
                resolve: (obj, args) => {
                    const filterArgs = _.assign({
                        seekerId: obj._id,
                    }, getFilters(args));
                    return connectionFromPromisedArray(bookmarkFetcher(obj), args)
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
    model: Seeker,
    type: SeekerType,
});

module.exports = SeekerType;
