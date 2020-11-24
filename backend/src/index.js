const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const background = require('./routers/background');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('/'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(userRouter);
app.use(taskRouter);
app.use(background);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let server = app.listen(process.env.PORT || 3000, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
});
