const multer = require('multer');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const jwtVerify = require('./../../config/jwt');
const jwt = require('jsonwebtoken');

const storage = multer.memoryStorage();
const multerMiddleware = multer({ storage }).fields([{ name: 'name' }]);
// to accept from any fields use .any();
const auth = (req) => {
    let tokenData = null;
    if (req.headers && req.headers.authorization) {
        const header = req.headers.authorization;
        if (header !== 'Bearer null' && header.indexOf('Bearer') !== -1) {
            let token;
            token = header.split('Bearer ');
            token = token[1];
            tokenData = jwt.verify(token, jwtVerify.key.secret);
            return tokenData;
        }
        return tokenData;
    }
    return tokenData;
};

module.exports = (req, res) => {
    if (auth(req) !== null) {
        multerMiddleware(req, res, () => {
            const files = _.values(req.files);
            if (!files || files.length === 0) {
                console.log('No files to Upload');
                // return next();
                res.status(403).send('No files to upload');
                return;
            }
            files.forEach((fileArray) => {
                const file = fileArray[0];
                const filename = `${Date.now()}_${file.originalname}`;
                const filePath = path.join(__dirname, '../images', filename);
                fs.writeFile(filePath, file.buffer, (err) => {
                    if (err) return new Error(err);
                    console.log(`Image Saved to path ${filePath}`);
                    return res.send(filename);
                });
            });
        });
    } else res.status(401).send('Not Authorized');
};
