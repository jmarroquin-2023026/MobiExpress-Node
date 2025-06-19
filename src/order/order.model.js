import {Schema, model} from 'mongoose'

const orderSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products:[{
            product:{ 
                type:Schema.Types.ObjectId,
                ref:'Product',
                required:[true,'Products are required']
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }
    }],
    dueDate:{
        type:Date,
        required:[true,'Date is required']
    },
    returnDate:{
        type:Date,
        required:[true,'Date is required']
    },
    status:{
        type:String,
        enum:['in_enum', 'returned']
    },
    total:{
        type:Number,
        required:true
    }
},
    {versionKey: false}
)

export default model ('order', orderSchema);