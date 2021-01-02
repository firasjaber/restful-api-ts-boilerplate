import express from 'express';
import {createItem, getAllItems, getItem} from './../controllers/item.controllers';

const router = express.Router();

router.get('/get',getItem);
router.get('/get/all', getAllItems);
router.post('/post', createItem);

export = router;
