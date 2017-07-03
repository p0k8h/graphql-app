const Seeker = require('./../../models/seeker');

const getSeekers = (filterArgs, fieldASTs) => new Promise((resolve, reject) => {
    Seeker.find(filterArgs, { password: 0 }, (err, d) => {
        if (err) reject(err);
        resolve(d);
    });
});

module.exports = getSeekers;
