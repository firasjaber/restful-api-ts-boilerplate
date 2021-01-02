import mongoose from 'mongoose';
import config from './../config/config';
import logging from './../config/logging';

const NAMESPACE = 'Server';

async function connectDB() {
    try {
        await mongoose.connect(config.mongo.url,config.mongo.options)
        logging.info(NAMESPACE,'Connected to MongoDB');
    } catch (err) {
        logging.error(NAMESPACE, err.message,err);
    }
}

export default connectDB;
