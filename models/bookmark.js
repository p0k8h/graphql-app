const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: true,
    },
    seekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seeker',
        required: true,
    },
});

bookmarkSchema.index({ seekerId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('bookmark', bookmarkSchema);
