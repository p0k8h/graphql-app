const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'job',
        required: true,
    },
    seekerId: {
        type: Schema.Types.ObjectId,
        ref: 'Seeker',
        required: true,
    },
    employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer',
    },
    status: {
        type: String,
        default: 'Applied',
    },
});

jobApplicationSchema.index({ seekerId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('application', jobApplicationSchema);
