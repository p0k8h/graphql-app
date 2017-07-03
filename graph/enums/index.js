const { GraphQLEnumType } = require('graphql');

const IndustryType = new GraphQLEnumType({
    name: 'industries',
    values: {
        ACCOUNTING: { value: 'accounting' },
        BANK: { value: 'bank' },
        IT: { value: 'IT' },
        ART: { value: 'art' },
        TOURISM: { value: 'tourism' },
    },
});

const OwnerShipType = new GraphQLEnumType({
    name: 'ownerShips',
    values: {
        GOVERNMENT: { value: 'government' },
        NON_PROFIT: { value: 'non profit' },
        PRICATE: { value: 'private' },
        PUBLIC: { value: 'public' },
    },
});

const StatusType = new GraphQLEnumType({
    name: 'status',
    values: {
        WORKING: { value: 'working' },
        NOT_WORKING: { value: 'not working' },
    },
});

const LocationType = new GraphQLEnumType({
    name: 'locations',
    values: {
        KATHMANDU: { value: 'kathmandu' },
        BHAKTAPUR: { value: 'bhaktapur' },
        LALITPUR: { value: 'lalitpur' },
        POKHARA: { value: 'pokhara' },
        BUTWAL: { value: 'butwal' },
        CHITWAN: { value: 'chitwan' },
        DHANGADI: { value: 'dhangadi' },
        BIRATNAGAR: { value: 'biratnagar' },
    },
});

module.exports.IndustryType = IndustryType;
module.exports.OwnerShipType = OwnerShipType;
module.exports.StatusType = StatusType;
module.exports.LocationType = LocationType;
