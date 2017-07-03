const _ = require('lodash');
const async = require('async');

const Job = require('././../../../models/job');
const Applicant = require('././../../../models/jobApplication');

const getJobs = obj => new Promise((resolve, reject) => {
    async.waterfall([
        (callback) => {
            Applicant.find({ seekerId: obj._id }, (err, res) => {
                if (err) return callback(err);
                if (res === null) return callback(null);
                callback(null, res);
            });
        },
        (res, callback) => {
            const IDs = _.map(res, v => v.jobId);
            Job.find({ _id: { $in: IDs } }, (err, resp) => {
                if (err) return callback(err);
                callback(null, resp);
            });
        },
    ], (err, result) => {
        if (err) reject(err);
        resolve(result);
    });
});

module.exports = getJobs;
