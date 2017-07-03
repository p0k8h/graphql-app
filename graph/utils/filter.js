const _ = require('lodash');

const fixedArgs = ['first', 'before', 'last', 'after'];

function getFilters(args) {
    return _.omit(args, fixedArgs);
}

module.exports = getFilters;
