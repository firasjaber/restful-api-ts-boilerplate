import express from 'express';
import {getAllUsers, getUser, login, register, validateToken} from '../controllers/user.controllers';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/get',getUser);
router.get('/get/all',getAllUsers);
router.get('/validate',extractJWT,validateToken);
router.post('/register',register);
router.post('/login',login);


export = router;
