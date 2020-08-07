const express = require('express');
//require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const background = require('./routers/background');
const cors = require('cors');
const app = express();

app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
app.use(background);
app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

