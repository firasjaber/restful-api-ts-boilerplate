import {Request , Response , NextFunction} from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Sample Controller';

export const samlpeHealthCheck = (req: Request , res: Response, next : NextFunction) => {
    logging.info(NAMESPACE, `Sample health check route called.`);

    return res.status(200).json({
        message: 'pong',
        success: true
    })
}
