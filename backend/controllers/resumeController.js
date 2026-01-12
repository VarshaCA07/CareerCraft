const Resume = require('../models/Resume');

// @desc    Get user resume
// @route   GET /api/resume
// @access  Private
const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ user_id: req.user.id });
        if (!resume) {
            // Return empty default if not found, or 404. Let's return empty structure to avoid frontend errors
            return res.status(200).json({ data: {} });
        }
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Save/Update user resume
// @route   POST /api/resume
// @access  Private
const saveResume = async (req, res) => {
    const { data } = req.body;

    try {
        const resume = await Resume.findOneAndUpdate(
            { user_id: req.user.id },
            { $set: { data: data } },
            { new: true, upsert: true }
        );
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Upload PDF
// @route   POST /api/resume/upload
// @access  Private
const uploadResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Construct accessible URL. Assuming static serve setup in server.js
    const pdfUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    try {
        await Resume.findOneAndUpdate(
            { user_id: req.user.id },
            { $set: { pdf_url: pdfUrl } },
            { new: true, upsert: true }
        );
        res.status(200).json({ pdf_url: pdfUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error saving PDF URL' });
    }
};

module.exports = {
    getResume,
    saveResume,
    uploadResume,
};
