const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    data: {
        type: Object,
        default: {},
    },
    pdf_url: {
        type: String,
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
