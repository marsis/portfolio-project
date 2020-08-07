const express = require('express');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const background = require('./routers/background');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
app.use(background);
let server = app.listen(process.env.PORT || 3000, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
});
