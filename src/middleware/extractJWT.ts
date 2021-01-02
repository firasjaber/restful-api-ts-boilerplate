import {Request, Response, NextFunction} from 'express';
import logging from '../config/logging';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const NAMESPACE= "Auth";

const extractJWT = (req: Request, res: Response, next:NextFunction) => {
    logging.info(NAMESPACE, 'Valilidating Token');
    let token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error: error
                })
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized',
            success: false
        });
    }
};

export default extractJWT;
