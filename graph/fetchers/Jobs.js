const Job = require('./../../models/job');

const getJobs = (filterArgs, fieldASTs) => new Promise((resolve, reject) => {
    console.log('filter jobs', filterArgs);
    filterArgs.applyBefore = { $gte: new Date() };
    Job.find(filterArgs).sort({ postedDate: -1 }).exec((err, d) => {
        if (err) reject(err);
        resolve(d);
    });
});

module.exports = getJobs;
