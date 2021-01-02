import express from 'express';
import {samlpeHealthCheck} from '../controllers/sample';

const router = express.Router();

router.get('/ping', samlpeHealthCheck);

export = router;

