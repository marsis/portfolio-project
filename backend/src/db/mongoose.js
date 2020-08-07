const mongoose = require('mongoose');
const config = require('../config');

const url = process.env.MONGODB_URI || config.mongoUrl;

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
