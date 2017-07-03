const {
    fromGlobalId,
    nodeDefinitions,
} = require('graphql-relay');

const Job = require('./../../models/job');
const Seeker = require('./../../models/seeker');
const Employer = require('./../../models/employer');

const checkers = [];

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);

        console.log('NodeDefinitions (globalId), id:', id);
        console.log('NodeDefinitions (globalId), type:', type);

        if (type === 'JobType') {
            return Job.findOne({ _id: id }).exec();
        } else if (type === 'SeekerType') {
            return Seeker.findOne({ _id: id }).exec();
        } else if (type === 'EmployerType') {
            return Employer.findOne({ _id: id }).exec();
        }
        return null;
    },
    (obj) => {
        let type;
        checkers.forEach((v) => {
            if (obj instanceof v.model) {
                type = v.type;
            }
        });
        return type;
    });

module.exports = {
    checkers,
    nodeInterface,
    nodeField,
};
