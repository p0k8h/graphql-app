const async = require('async');

const Job = require('./../../models/job');
const Seeker = require('./../../models/seeker');
const Employer = require('./../../models/employer');
const Applicant = require('./../../models/jobApplication');
const Bookmark = require('././../../models/bookmark');

const checkEmail = (data, cb) => {
    const email = { email: data.email };
    let flag = 0;
    async.series([
        (callback) => {
            Seeker.findOne(email, (err, d) => {
                if (err) return callback(err);
                if (d === null) {
                    flag = 1;
                    return callback(null, 'no user');
                }
                callback('Already Registered');
            });
        },
        (callback) => {
            if (flag) {
                Employer.findOne(email, (err, d) => {
                    if (err) return callback(err);
                    if (d === null) {
                        return callback(null, 'no user');
                    }
                    callback('Already Registered');
                });
            } else {
                callback('Already Registered');
            }
        },
    ], cb);
};

const verifyEmployer = (data, auth) => new Promise((resolve, reject) => {
    if (auth.token && auth.token.isEmployer) {
        data.employerId = auth.token._id;
        const jb = new Job(data);
        jb.save((err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    } else reject('Not Authorized');
});

const updateProfile = (Model, data, auth) => new Promise((resolve, reject) => {
    if (auth.token) {
        const _id = auth._id;
        Model.findOneAndUpdate({ _id }, { $set: data }, { new: true }, (err, d) => {
            if (err) return resolve(err);
            return resolve(d);
        });
    } else reject('Not Authorized');
});

const updateJob = (data, auth) => new Promise((resolve, reject) => {
    let employerId;
    async.waterfall([
        (callback) => {
            if (auth.token && auth.token.isEmployer) {
                employerId = auth.token._id;
                Job.findById(data.jobId, (err, res) => {
                    if (err) return callback(err);
                    if (res === null) return callback(`No job with ${data.jobId}`);
                    return callback(null, res);
                });
            }
            callback('Not an Employer');
        },
        (d, callback) => {
            if (employerId == d.employerId) {
                Job.findByIdAndUpdate(d._id, { $set: data }, { new: true }, (err, r) => {
                    if (err) return callback(err);
                    return callback(null, r);
                });
            }
            callback('Verification failed');
        },
    ], (err, result) => {
        if (err) reject(err);
        resolve(result);
    });
});

const applyForJobs = (data, auth) => new Promise((resolve, reject) => {
    const jobId = data.jobId;
    let seekerId;
    async.waterfall([
        (callback) => {
            if (auth.token && auth.token.isSeeker) {
                seekerId = auth.token._id;
                Job.findById(jobId, (err, d) => {
                    if (err) return callback(err);
                    if (d === null) return callback(`No Records for Job id ${jobId}`);
                    return callback(null, d);
                });
            } else callback('Not a Seeker');
        },
        (d, callback) => {
            const detail = {
                jobId,
                seekerId,
                employerId: d.employerId,
            };
            Applicant.create(detail, (err, res) => {
                if (res === undefined) return callback('Duplicate');
                if (err) return callback(err);
                Bookmark.remove({ jobId, seekerId }, (e, r) => {
                    if (e) return callback(e);
                });
                return callback(null, res);
            });
        },
    ], (err) => {
        if (err) reject(err);
        resolve('applied for the job');
    });
});

const bookmarkJob = (d, auth) => new Promise((resolve, reject) => {
    let seekerId;
    if (auth.token && auth.token.isSeeker) {
        seekerId = auth.token._id;
        Applicant.find({ jobId: d.jobId, seekerId }, (err, data) => {
            if (err) return reject(err);
            if (data === null || data.length === 0) {
                const fields = { jobId: d.jobId, seekerId };
                Bookmark.create(fields, (error, res) => {
                    if (err) return reject(error);
                    if (res === undefined) return reject('DUPLICATE');
                    return resolve(res);
                });
            } else {
                return reject('Applied for job. No Bookmarks');
            }
        });
    } else {
        return reject('Not Authorized');
    }
});

const deleteJob = (d, auth) => new Promise((resolve, reject) => {
    async.parallel([
        (callback) => {
            if (auth.token && auth.token.isEmployer) {
                const employeeId = auth.token._id;
                Job.findOne({ employerId: employeeId }, (err, r) => {
                    if (err) return callback(err);
                    if (r === null) return callback('no employer with id');
                    return callback(null, r);
                });
            }
        },
        (callback) => {
            Job.findByIdAndRemove(d.jobId, (err, r) => {
                if (err) return callback(err);
                if (r === null) return callback(' no Job found with respective id');
                return callback(null, r);
            });
        },
        (callback) => {
            Applicant.remove({ jobId: d.jobId }, callback);
        },
    ], (errr) => {
        if (errr) reject(errr);
        resolve('Job removed');
    });
});


module.exports.checkEmail = checkEmail;
module.exports.verifyEmployer = verifyEmployer;
module.exports.authorizedUpdate = updateProfile;
module.exports.updateJob = updateJob;
module.exports.applyForJobs = applyForJobs;
module.exports.deleteJob = deleteJob;
module.exports.bookmarkJob = bookmarkJob;
