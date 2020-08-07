const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const background = require('./routers/background');
const http = require('http')
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
const port = process.env.PORT || 3000;

app.set('port', port);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use(userRouter);
app.use(taskRouter);
app.use(background);

const server = http.createServer(app);
server.listen(port, () => console.log('Server is up on port: ' + port));





