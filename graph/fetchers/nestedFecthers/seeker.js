const async = require('async');
const _ = require('lodash');

const Seeker = require('././../../../models/seeker');
const Applicant = require('././../../../models/jobApplication');

const getSeekers = obj => new Promise((resolve, reject) => {
    let seek = [];
    async.waterfall([
        (callback) => {
            Applicant.find({ jobId: obj._id }, { password: 0 }, (err, d) => {
                if (err) return callback(err);
                if (d === null) return callback('no data');
                if (d) {
                   seek = _.map(d, v => v.seekerId);
                }
                return callback(null, seek);
            });
        },
        (ids, callback) => {
            Seeker.find({ _id: { $in: ids } }, { password: 0 }, (err, res) => {
                if (err) return callback(err);
                if (res === null) return callback('no data');
                return callback(null, res);
            });
        },
    ], (err, result) => {
        if (err) reject(err);
        if (result.length === 0) reject('no data');
        resolve(result);
    });
});

module.exports = getSeekers;
