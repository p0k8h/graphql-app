const jwt = require('jsonwebtoken');
const key = require('./../../config/jwt');

const loadUser = (req) => {
    if (req.headers.authorization) {
        return new Promise((resolve) => {
            let tokenData = null;
            try {
                const header = req.headers.authorization;
                if (header !== 'Bearer null' && header.indexOf('Bearer') !== -1) {
                    let token;
                    token = header.split('Bearer ');
                    token = token[1];
                    tokenData = jwt.verify(token, key.key.secret);
                } else {
                    throw tokenData;
                }
            } catch (err) {
                resolve(err);
            }
            resolve(tokenData);
        });
    }
    return new Promise((resolve) => {
        resolve(null);
    });
};

const getData = (req, res, next) => {
    loadUser(req).then((token) => {
        if (token !== null && token !== undefined) {
            req.token = token._doc;
        } else {
            req.token = token;
        }
        next();
    }).catch((err) => {
        res.send(err).status(403);
    });
};

module.exports = getData;
