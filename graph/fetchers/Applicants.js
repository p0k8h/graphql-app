const _ = require('lodash');
const async = require('async');
const Applicant = require('./../../models/jobApplication');
const Job = require('./../../models/job');
const Seeker = require('./../../models/seeker');
const Employer = require('./../../models/employer');

const getApplicants = () => new Promise((resolve, reject) => {
    let jobId = [];
    let seekerId = [];
    let employerId = [];
    async.series([
        (callback) => {
            Applicant.find({}, { password: 0 })
                .exec((err, d) => {
                    if (err) return callback(err);
                    if (d === null) return callback('No data');
                    jobId = _.map(d, v => v.jobId);
                    seekerId = _.map(d, v => v.seekerId);
                    employerId = _.map(d, v => v.employerId);
                    callback();
                });
        },
        (callback) => {
            Job.find({ _id: { $in: jobId } }).sort({ postedDate: -1 }).exec((err, d) => {
                if (err) return callback(err);
                if (d === null) return callback('no data');
                callback(null, d);
            });
        },
        (callback) => {
            Seeker.find({ _id: { $in: seekerId } }).exec((err, d) => {
                if (err) return callback(err);
                if (d === null) return callback('no data');
                callback(null, d);
            });
        },
        (callback) => {
            Employer.find({ _id: { $in: employerId } }).exec((err, d) => {
                if (err) return callback(err);
                if (d === null) return callback('no data');
                callback(null, d);
            });
        },
    ], (err, result) => {
        if (err) reject(err);
        resolve(result);
    });
});

module.exports = getApplicants;
