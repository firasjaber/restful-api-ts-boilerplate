import express from 'express';
import {
    getAllUsers,
    getUser,
    login,
    register,
    getLoggenInUser,
} from '../controllers/user.controllers';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/get', getUser);
router.get('/get/all', getAllUsers);
router.get('/loggedin', auth, getLoggenInUser);
router.post('/register', register);
router.post('/login', login);

export = router;
