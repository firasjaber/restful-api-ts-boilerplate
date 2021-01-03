import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import IUser from '../interfaces/user';

const NAMESPACE = "Auth";

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void):void => {
    let timeSinchEpoch = new Date().getTime();
    let expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
    let expirationTimeInSecons = Math.floor(expirationTime / 1000);

    logging.info(NAMESPACE, `Attempting to sign token for ${user.username}`);

    try {

        jwt.sign({_id: user._id} , config.server.token.secret, {
            issuer : config.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSecons
        }, (error, token) => {
            if (error) {
                callback(error,null);
            } else if (token) {
                callback(null,token);
            }
        }) 
    } catch (error) {
        logging.error(NAMESPACE, error.message,error);
        callback(error,null);
    }
};

export default signJWT;
