import { Schema, model } from "mongoose";

const cardSchema = Schema(
    {
        titular:{
            type: String,
            maxLength: [50, `Can't be overcome 50 characters`],
            required: true,
            unique:false
        },
        number:{
            type: String,
            maxLength: [16, `Card number can't exceed 16 digits`],
            unique: true,
            required: true
        },
        expirationDate:{
            maxLength: [5, `Expiration date must be in MM/YY format`],
            type: String,
            required: true
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'user',
            required:[true]
        },

        
    }
)

cardSchema.methods.toJSON = function() {
    const { __v, ...card } = this.toObject();
    return card;
}

export default model('Card', cardSchema);