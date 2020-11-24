const mongoose = require('mongoose');
const config = require('../config');

// const url = 'mongodb://' + 'alla' + ':' + 'qwerty123' + '@ds145146.mlab.com:45146/heroku_rxn2r7kr' || config.mongoUrl;
const url = config.mongoUrl;

//'mongoUrl': 'mongodb+srv://app_user:egFSD1byuwrlQYfz@mongodb-dev-cluster01-wb7eq.gcp.mongodb.net/sidekick?retryWrites=true&w=majority',

//mongoose.connect('mongodb://' + mongoCredentials.username + ':' + mongoCredentialss.password + '@ds012345.mlab.com:12345/mydatabase-db');
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true},
    function (err, client) {
        if (err) {
            console.log(err);
            process.exit(1);
        }}
);

/*
connect.then((db) => {
    console.log('Connected correctly to server');
    console.log(db);
}, (err) => { console.log(err); });*/
