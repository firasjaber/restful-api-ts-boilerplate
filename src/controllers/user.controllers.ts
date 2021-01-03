import { Request, Response, NextFunction } from 'express';
import logging from './../config/logging';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import User from '../models/User';
import signJWT from '../utils/signJWT';

const NAMESPACE = 'User Controllers';

export const getLoggenInUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logging.info(NAMESPACE, 'validate token route called.');
    const { _id } = res.locals.user;
    try {
        const user = await User.findOne({ _id });
        if (!user) {
            throw new Error('Authentication failed');
        }
        return res.status(200).json({
            user,
        });
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);
        return res.status(500).json({
            message: error.message,
            error,
        });
    }
};

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logging.info(NAMESPACE, 'register route called.');
    let { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(401).json({
                message: 'User already exits.',
                success: false,
            });
        }

        bcryptjs.hash(password, 10, async (hashError, hash) => {
            if (hashError) {
                return res.status(500).json({
                    message: hashError.message,
                    error: hashError,
                });
            }

            const _user = new User({
                _id: new mongoose.Types.ObjectId(),
                username,
                password: hash,
            });

            await _user.save();
            return res.status(201).json({
                message: 'User Created',
                user: _user,
                success: true,
            });
        });
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);
        return res.status(500).json({
            message: error.message,
            error,
        });
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logging.info(NAMESPACE, 'login route called.');
    let { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid Credentials',
                success: false,
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid Credentials',
                success: false,
            });
        }

        signJWT(user, (_error, token) => {
            if (_error) throw _error;
            if (token) {
                return res.status(200).json({
                    message: 'Authentication Successful',
                    token,
                    user,
                });
            }
        });
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);
        return res.status(500).json({
            message: error.message,
            error: error,
        });
    }
};

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logging.info(NAMESPACE, 'get all users route called.');

    try {
        const users = await User.find().select('-password');

        return res.status(200).json({
            success: true,
            users,
            count: users.length,
        });
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);
        return res.status(500).json({
            message: error.message,
            error: error,
        });
    }
};
