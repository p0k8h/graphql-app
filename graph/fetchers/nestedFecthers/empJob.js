const Job = require('././../../../models/job');

const getJob = obj => new Promise((resolve, reject) => {
    Job.find({ employerId: obj._id }).exec((err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

module.exports = getJob;
