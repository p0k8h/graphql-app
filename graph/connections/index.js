const {
    GraphQLInt,
} = require('graphql');

const {
    connectionDefinitions,
} = require('graphql-relay');

const Job = require('./.././../models/job');
const Employer = require('./../../models/employer');
const Seeker = require('./../../models/seeker');
const Bookmark = require('./../../models/bookmark');
const Applicant = require('./../../models/jobApplication');

const JobType = require('././../types/JobType');
const EmployerType = require('././../types/EmployerType');
const SeekerType = require('././../types/SeekerType');
const BookmarkType = require('././../types/BookmarkType');

const { connectionType: JobConnection } = connectionDefinitions({
    name: 'Job',
    nodeType: JobType,
    connectionFields: {
        count: {
            type: GraphQLInt,
            resolve: (args) => {
                const filter = args.args || {};
                return Job.count(filter).exec();
            },
        },
    },
});

const { connectionType: EmployerConnection } = connectionDefinitions({
    name: 'Employer',
    nodeType: EmployerType,
    connectionFields: {
        count: {
            type: GraphQLInt,
            resolve: (args) => {
                const filter = args.args || {};
                return Employer.count(filter).exec();
            },
        },
    },
});

const { connectionType: SeekerConnection } = connectionDefinitions({
    name: 'Seeker',
    nodeType: SeekerType,
    connectionFields: {
        count: {
            type: GraphQLInt,
            resolve: (args) => {
                const filter = args.args || {};
                return Seeker.count(filter).exec();
            },
        },
    },
});

const { connectionType: BookmarkConnection } = connectionDefinitions({
    name: 'Bookmark',
    nodeType: BookmarkType,
    connectionFields: {
        count: {
            type: GraphQLInt,
            resolve: (args) => {
                const filter = args.args || { ndddd: 'ssss' };
                return Bookmark.count(filter).exec();
            },
        },
    },
});

const { connectionType: ApplicantConnection } = connectionDefinitions({
    name: 'Applicant',
    nodeType: JobType,
    connectionFields: {
        count: {
            type: GraphQLInt,
            resolve: (args) => {
                const filter = args.args || {};
                return Applicant.count(filter).exec();
            },
        },
    },
});

const { connectionType: Sconnection } = connectionDefinitions({
    name: 'Sconnection',
    nodeType: SeekerType,
    connectionFields: {
        count: {
            type: GraphQLInt,
            resolve: (args) => {
                const filter = args.args || { mdd: 'sss' };
                return Applicant.count(filter).exec();
            },
        },
    },
});


module.exports.JobConnection = JobConnection;
module.exports.EmployerConnection = EmployerConnection;
module.exports.SeekerConnection = SeekerConnection;
module.exports.BookmarkConnection = BookmarkConnection;
module.exports.ApplicantConnection = ApplicantConnection;
module.exports.Sconnection = Sconnection;

