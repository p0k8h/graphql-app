const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
  openings: { type: Number, required: true },
  education: { type: String, required: true },
  location: String,
  postedDate: { type: Date, default: Date.now() },
  applyBefore: Date,
  salary: Number,
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
});

module.exports = mongoose.model('job', jobSchema);
