const mongoose = require('mongoose');
const encrypting = require('./../config/encrypting');

const jobEmployerSchema = new mongoose.Schema({
    company: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageLink: String,
    industry: String,
    ownerShip: String,
    totalEmployees: Number,
    address: String,
    location: String,
    phone: Number,
    fax: String,
    website: String,
    isEmployer: { type: Boolean, default: true },
});

jobEmployerSchema.pre('save', function (next) {
    const a = 0;
    const employer = this;
    if (!employer.isModified('password')) {
        return next();
    }
    encrypting.Hashing(employer, a, function (err, result) {
        if (err) return next(err);
        next();
    });
});

jobEmployerSchema.pre('findOneAndUpdate', function (next) {
    const emp = this;
    const employer = {};
    if (emp._update.$set.password === undefined) {
        return next();
    }
    employer.password = emp._update.$set.password;
    employer.value = true;
    encrypting.Hashing(employer, emp, function (err, result) {
        if (err) return next(err);
        next();
    });
});

jobEmployerSchema.statics.comparePassword = function (ePwd, userPwd, cb) {
    encrypting.ComparePassword(ePwd, userPwd, function (err, matched) {
        if (err) return cb(err);
        cb(null, matched);
    });
};


module.exports = mongoose.model('Employer', jobEmployerSchema);
