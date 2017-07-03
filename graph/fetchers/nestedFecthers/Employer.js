const Employer = require('././../../../models/employer');

const getEmployers = obj => new Promise((resolve, reject) => {
    const IDs = obj.employerId;
    Employer.find({ _id: { $in: IDs } }, { password: 0 }, (err, res) => {
        if (err) reject(err);
        if (res === null) reject(null);
        resolve(res);
    });
});

module.exports = getEmployers;
