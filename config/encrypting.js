const bcrypt = require('bcryptjs');

const SALT = 10;

function Hashing(user, userObj, cb) {
    bcrypt.genSalt(SALT, (err, salt) => {
        bcrypt.hash(user.password, salt, (err1, hash) => {
            if (err1) {
                return cb(err1);
            }
            if (user.value) {
                userObj._update.$set.password = hash;
                return cb(null, userObj._update.$set.password);
            }
            user.password = hash;
            return cb(null, user.password);
        });
    });
}

function ComparePassword(enteredPassword, userPassword, cb) {
    bcrypt.compare(enteredPassword, userPassword, (err, r) => {
        if (err) {
            return cb(err);
        } else if (r) {
            return cb(null, r);
        }
        return cb('wrong password');
    });
}

module.exports.ComparePassword = ComparePassword;
module.exports.Hashing = Hashing;
