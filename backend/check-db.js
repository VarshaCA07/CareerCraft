
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Resume = require('./models/Resume');
const User = require('./models/User');

dotenv.config();

const checkDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('MONGO_URI is missing in .env');
            return;
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Check Users
        const userCount = await User.countDocuments();
        console.log(`\n📊 Users in database: ${userCount}`);

        const users = await User.find().limit(5);
        if (users.length > 0) {
            console.log('--- Latest Users ---');
            users.forEach(u => console.log(`- ${u.name} (${u.email})`));
        }

        // Check Resumes
        const resumeCount = await Resume.countDocuments();
        console.log(`\n📄 Resumes in database: ${resumeCount}`);

        const resumes = await Resume.find().populate('user_id', 'name email').limit(5);
        if (resumes.length > 0) {
            console.log('--- Latest Resumes ---');
            resumes.forEach(r => {
                const userName = r.user_id ? r.user_id.name : 'Unknown User';
                const resumeTitle = r.data.title || 'Untitled Resume';
                console.log(`- User: ${userName} | Title: ${resumeTitle} | Last Updated: ${r.updatedAt}`);
            });
        } else {
            console.log('No resumes found. Try saving one from the frontend!');
        }

        mongoose.disconnect();
    } catch (error) {
        console.error('Error checking Database:', error);
    }
};

checkDB();
