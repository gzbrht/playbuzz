const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./src/db');
const config = require('config');
const rootRouter = require('./src/routes');
process.on('uncaughtException', err => {
    console.error('uncaughtException');
});
process.on('unhandledRejection', err => {
    console.error('unhandledRejection');
});
async function start() {
    try {
        await db.connect(config.mongodb);
        const app = express();
        const port = process.env.PORT || 3003;
        const host = process.env.HOST || '0.0.0.0';
        app.set('host', host);
        app.set('port', port);
        app.use(compression());
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use((err, _, res, __) => {
            console.error(err);
            res.status(500).send('Server Error');
        });
        app.use('/', rootRouter);
        app.listen(port);
        console.log('server is up and running on port %d', port);
    } catch(err) {
        console.error('failed to start server', err);
        process.exit(1);
    }
}

start();
