import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import itemRoute from './routes/item.routes';
import userRoute from './routes/user.routes';
import connectDB from './utils/db';
import monitor from 'express-status-monitor';
import helmet from 'helmet';

const NAMESPACE = 'Server';
const app = express();

/** Connecting to MongoDB Database */
connectDB();

/** Simple Monitoring */
app.use(monitor());

/** Security Headers */
app.use(helmet());

/** Logging the request */
app.use((req, res, next) => {
    logging.info(
        NAMESPACE,
        `REQUEST : METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
        logging.info(
            NAMESPACE,
            `RESPONSE : METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
    });

    next();
});

/** Parsing the request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Rules of the API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

/** Routing */
app.use('/api/v1/items', itemRoute);
app.use('/api/v1/users', userRoute);

/** Error Handling */
app.use((req, res, next) => {
    const error = new Error('Route Not found');

    return res.status(400).json({
        message: error.message,
    });
});

/** Creating the server */
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () =>
    logging.info(
        NAMESPACE,
        `Server running on ${config.server.hostname}:${config.server.port}`
    )
);
