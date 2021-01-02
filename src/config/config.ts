import dotenv from 'dotenv';

dotenv.config();

const MONGODB_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: true,
};

const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'boilerplate';
const MONGODB_USERNAME = process.env.MONGODB_USERNAME || 'firasjaber';
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'firrj92';
const MONGODB_HOST = process.env.MONGODB_HOST || 'cluster0.jh0us.mongodb.net';

const MONGO = {
    host : MONGODB_HOST,
    username : MONGODB_USERNAME,
    password : MONGODB_PASSWORD,
    options : MONGODB_OPTIONS,
    url : `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}`
}


const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '3001';

const SERVER_TOKEN_EXPRIRETIME = process.env.SERVER_TOKEN_EXPRIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'firasjaberc@gmail.com';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'supersecret';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPRIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
}

const config = {
    mongo: MONGO,
    server: SERVER
}

export default config;
