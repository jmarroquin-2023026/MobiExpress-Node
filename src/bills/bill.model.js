import { Schema, model } from "mongoose";

const billSchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        NIT: {
            type: String,
            maxLength: [9, "Can't be more than 9 characters"],
            required: false,
            default:"C/F"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        /*purchase: {
            type: Schema.Types.ObjectId,
            ref: 'ShoppingCart',
            required: true
        },*/
        products:[{
                products: { 
                    type: Schema.Types.ObjectId, 
                    ref:'Product', 
                    name: String,
                    price: Number,
                    required: true
                },
                quantity:{
                     type:Number
                },
                subTotal:{
                    type:Number
                }
            }],
        total: {
            type:Number,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

export default model('Bill', billSchema);