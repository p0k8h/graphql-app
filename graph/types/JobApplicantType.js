const {
    GraphQLObjectType,
} = require('graphql');
const {
    connectionArgs,
    connectionFromArray,
} = require('graphql-relay');

const ApplicationType = new GraphQLObjectType({
    name: 'ApplicationType',
    fields: () => {
        const connections = require('././../connections');
        return {
            job: {
                type: connections.JobConnection,
                args: connectionArgs,
                resolve: (obj, args) => connectionFromArray(obj[1], args),
            },
            seeker: { type: connections.SeekerConnection,
                 args: connectionArgs,
                 resolve: (obj, args) => connectionFromArray(obj[2], args),
            },
            employer: {
                 type: connections.EmployerConnection,
                 args: connectionArgs,
                 resolve: (obj, args) => connectionFromArray(obj[3], args),
            },
        };
    },
});

module.exports = ApplicationType;
