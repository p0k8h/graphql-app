const Employer = require('./../../models/employer');

const getEmployer = filterArgs => new Promise((resolve, reject) => {
    Employer.find(filterArgs, { password: 0 }, (err, res) => {
        if (err) reject(err);
        if (res === null) reject(' no data found');
        resolve(res);
    });
});

module.exports = getEmployer;
