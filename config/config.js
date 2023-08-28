const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, process.env.npm_lifecycle_event + '.env') // process.env.npm_lifecycle_event or process.env.NODE_ENV
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PASSWORD: process.env.PASSWORD || 'password',
    USER: process.env.USER || 'user',
    HOST: process.env.HOST || 'localhost',
    MONGODB_URI: process.env.MONGODB_URI || 'uri-mongo'
}