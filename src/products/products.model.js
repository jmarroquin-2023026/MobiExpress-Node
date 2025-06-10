    import { Schema, model } from 'mongoose'

    const productSchema = Schema({
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        price: {
            type: Number,
            required: [true, 'Price is required']
        },
        datesAvalible:[{
            type: Date,
        }],
        brand: {
            type: String,
            required: [true, 'Branch is required']
        },
        stock: {
            type: Number,
            required: [true, 'Stock is required']
        },
        discount:{
            type:String,
            required:[false]
        },
        images:[{
            type:String,
            required:[true, 'Product image is required']
        }]
    },
        {versionKey: false}
    )

    export default model('Product', productSchema)