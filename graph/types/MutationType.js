const { GraphQLObjectType } = require('graphql');

const EmployerMutation = require('./../mutations/EmployerMutation');
const JobMutation = require('./../mutations/JobMutation');
const SeekerMutation = require('./../mutations/SeekerMutation');
const LoginMutation = require('./../mutations/LoginMutation');
const ApplicationMutation = require('./../mutations/JobApplication');
const DeleteJob = require('././../mutations/DeleteJobMutation');
const BookmarkMutation = require('./../mutations/BookmarkMutation');
const EmployerUpdateMutation = require('./../mutations/updateEmployer');
const SeekerUpdateMutation = require('./../mutations/updateSeeker');
const JobUpdateMutation = require('./../mutations/updateJob');

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        seeker: SeekerMutation,
        employer: EmployerMutation,
        job: JobMutation,
        login: LoginMutation,
        applyJob: ApplicationMutation,
        updateEmployer: EmployerUpdateMutation,
        updateSeeker: SeekerUpdateMutation,
        updateJob: JobUpdateMutation,
        deleteJob: DeleteJob,
        bookmark: BookmarkMutation
    }),
});

module.exports = MutationType;
