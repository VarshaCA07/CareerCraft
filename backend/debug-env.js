
const dotenv = require('dotenv');
const path = require('path');

// Try loading from current directory
console.log('Current directory:', process.cwd());
const result = dotenv.config();

if (result.error) {
    console.log('Error loading .env:', result.error);
} else {
    console.log('.env loaded successfully');
    console.log('Parsed keys:', Object.keys(result.parsed));
    console.log('MONGO_URI value type:', typeof process.env.MONGO_URI);
    if (process.env.MONGO_URI) {
        console.log('MONGO_URI starts with:', process.env.MONGO_URI.substring(0, 10) + '...');
    } else {
        console.log('MONGO_URI is undefined or empty');
    }
}
