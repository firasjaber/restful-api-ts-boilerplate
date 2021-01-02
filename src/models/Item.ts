import {Schema, model} from 'mongoose';
import IItem from './../interfaces/item';

const ItemSchema: Schema = new Schema({
    name: {
        type: String, 
        required: true
    },
    price : {
        type: Number,
        required: true
    }},
    {
        timestamps: true
    }
);

export default model<IItem>('Item',ItemSchema);
