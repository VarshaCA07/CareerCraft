const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getResume, saveResume, uploadResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

// Multer config
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (path.extname(file.originalname) !== '.pdf') {
            return cb(new Error('Only PDFs are allowed'))
        }
        cb(null, true)
    }
});

router.get('/', protect, getResume);
router.post('/', protect, saveResume);
router.post('/upload', protect, upload.single('resume'), uploadResume);

module.exports = router;
