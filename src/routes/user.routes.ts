import express from 'express';
import auth from '../middleware/auth';
import {
    createValidationFor,
    checkValidationResult,
} from '../utils/validation';
import {
    getAllUsers,
    login,
    register,
    getLoggenInUser,
} from '../controllers/user.controllers';

const router = express.Router();

router.get('/get/all', getAllUsers);
router.get('/loggedin', auth, getLoggenInUser);
router.post(
    '/register',
    createValidationFor('register'),
    checkValidationResult,
    register
);
router.post(
    '/login',
    createValidationFor('login'),
    checkValidationResult,
    login
);

export = router;
