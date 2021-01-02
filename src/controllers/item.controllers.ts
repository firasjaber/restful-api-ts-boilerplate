import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Item from '../models/Item';
import IItem from '../interfaces/item';
import logging from './../config/logging';

const NAMESPACE = " Items Controllers";

export const getItem = (req: Request, res:Response, next:NextFunction) => {
    logging.info(NAMESPACE, 'get item route called.');
    
    const item = {
        name : "item 1",
        price : 10
    }

    return res.status(200).json({
        data: item,
        success: true
    })
}

export const getAllItems = async (req: Request, res: Response , next:NextFunction) => {
    logging.info(NAMESPACE, 'get all items route called.');
    try {
       const items : Array<IItem> = await Item.find();
       return res.status(200).json({
           data: {
                items,
                count : items.length
           },
           success : true
       })
    } catch (error) {
        logging.error(NAMESPACE, `INTERNAL ERROR ${error.message}`,error)
        return res.status(500).json({
            message: error.message,
            success : false,
            error
        })
    }
}

export const createItem = async (req: Request, res: Response, next:NextFunction) => {
    logging.info(NAMESPACE, 'create item route called.')
    let {name, price} = req.body;

    try {
        const item = new Item({
            _id: new mongoose.Types.ObjectId(),
            name,
            price
        });
        await item.save();
        return res.status(201).json({
            message: 'Item created successfully.',
            data: item,
            success : true
        });
    } catch (error) {
        logging.error(NAMESPACE, `INTERNAL ERROR ${error.message}`,error)
        return res.status(500).json({
            message: error.message,
            success : false,
            error
        });
    }
}

