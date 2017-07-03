const jwt = require('jsonwebtoken');
const async = require('async');

const key = module.exports.key = { secret: 'TheSecretKey' };
const Seeker = require('./../models/seeker');
const Employer = require('./../models/employer');

const getToken = user => jwt.sign(user, key.secret, {
    expiresIn: 86400,
});

const login = d => new Promise((resolve, reject) => {
    let flag = 0;
    async.series([
        (callback) => {
            Seeker.findOne({ email: d.email }).then((res) => {
                if (res === null) {
                    flag = 1;
                    return callback(null);
                }
                if (res !== null) {
                    if (!res) callback('no user');
                    Seeker.comparePassword(d.password, res.password, (err, match) => {
                        if (err) return callback('password not match');
                        const token = getToken(res);
                        return callback(null, token);
                    });
                }
            });
        },
        (callback) => {
            if (!flag) return callback(null);
            Employer.findOne({ email: d.email }).then((r) => {
                if (!r) return callback('no user');
                Employer.comparePassword(d.password, r.password, (err, match) => {
                    if (err) return callback('password not match');
                    const token = getToken(r);
                    return callback(null, token);
                });
            });
        }],
        (err, res) => {
            if (err) reject(err);
            res.forEach((ele) => {
                if (ele !== undefined) resolve(ele);
            });
        });
});

module.exports.login = login;
