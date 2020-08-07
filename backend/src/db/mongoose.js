const mongoose = require('mongoose');
const config = require('../config');

const url = config.mongoUrl;

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true},
    function (err, client) {
        if (err) {
            console.log(err);
            process.exit(1);
        }}
);
