const mongoose = require('mongoose');
const encrypting = require('./../config/encrypting');

const jobSeekerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    imageLink: String,
    education: String,
    address: String,
    isSeeker: { type: Boolean, default: true },
});

jobSeekerSchema.pre('save', function (next) {
    const a = 0;
    const seeker = this;
    if (!seeker.isModified('password')) {
        return next();
    }
    encrypting.Hashing(seeker, a, function (err, result) {
        if (err) return next(err);
        next();
    });
});

jobSeekerSchema.pre('findOneAndUpdate', function (next) {
    const seek = this;
    const seeker = {};
    if (seek._update.$set.password === undefined) {
        return next();
    }
    seeker.password = seek._update.$set.password;
    seeker.value = true;
    encrypting.Hashing(seeker, seek, (err) => {
        if (err) return next(err);
        return next();
    });
});

jobSeekerSchema.statics.comparePassword = (ePwd, userPwd, cb) => {
    encrypting.ComparePassword(ePwd, userPwd, (err, matched) => {
        if (err) return cb(err);
        return cb(null, matched);
    });
};

module.exports = mongoose.model('Seeker', jobSeekerSchema);
