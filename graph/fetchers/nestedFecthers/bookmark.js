const async = require('async');
const _ = require('lodash');

const Job = require('././../../../models/job');
const BookMark = require('././../../../models/bookmark');

const bookmarkFetcher = obj => new Promise((resolve, reject) => {
    let jobId = [];
    async.series([
        (callback) => {
            BookMark.find({ seekerId: obj._id }, (err, d) => {
                if (err) return callback(err);
                if (d.length === 0) return callback('no bookmarks');
                jobId = _.map(d, v => v.jobId);
                return callback(null, jobId);
            });
        },
        (callback) => {
            Job.find({ _id: { $in: jobId } }, callback);
        },
    ], (err, d) => {
        if (err) reject(err);
        resolve(d[1]);
    });
});

module.exports = bookmarkFetcher;
