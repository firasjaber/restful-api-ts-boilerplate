import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import sampleRoute from './routes/sample';
import itemRoute from './routes/item.routes';
import userRoute from './routes/user.routes';
import mongoose from 'mongoose';
import connectDB from './utils/db';

const NAMESPACE = 'Server';
const router = express();

/** Connecting to MongoDB Database */
connectDB();

/** Logging the request */
router.use((req,res,next) => {
    logging.info(NAMESPACE, `REQUEST : METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `RESPONSE : METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    })
    
    next();
});

/** Parsing the request */
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/** Rules of the API */
router.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    
    next();
})

/** Routing */
router.use('/api/v1/sample',sampleRoute);
router.use('/api/v1/items',itemRoute);
router.use('/api/v1/users',userRoute)

/** Error Handling */
router.use((req,res,next) => {
    const error = new Error('Route Not found');

    return res.status(400).json({
        message: error.message
    });
});

/** Creating the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));


