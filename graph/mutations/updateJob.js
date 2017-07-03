const {
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
} = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');

const VERIFY = require('./../utils/verify');
const JobType = require('./../types/JobType');

const JobUpdateMutation = mutationWithClientMutationId({
    name: 'JobUpdateMutation',
    inputFields: {
        jobId: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        position: { type: GraphQLString },
        experience: { type: GraphQLString },
        openings: { type: GraphQLInt },
        education: { type: GraphQLString },
        location: { type: GraphQLString },
        applyBefore: { type: GraphQLString },
        salary: { type: GraphQLFloat },
    },
    outputFields: {
        message: {
            type: JobType,
            resolve: obj => obj,
        },
    },
    mutateAndGetPayload: (data, auth) => VERIFY.updateJob(data, auth).then(res => res)
        .catch(err => new Error(err)),
});

module.exports = JobUpdateMutation;
