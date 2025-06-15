import { Schema, model } from "mongoose";

const cardSchema = Schema(
    {
        titular:{
            type: String,
            maxLength: [50, `Can't be overcome 50 characters`],
            unique: true,
            required: true
        },
        number:{
            type: Number,
            maxLength: [16, `Card number can't exceed 16 digits`],
            unique: true,
            required: true
        },
        expirationDate:{
            maxLength: [5, `Expiration date must be in MM/YY format`],
            type: Date,
            unique: true,
            required: true
        },
        cvv:{
            type: Number,
            maxLength: [3, `CVV must be 3 digits`],
            unique: true,
            required: true
        },
        
    }
)

cardSchema.methods.toJSON = function() {
    const { __v, ...card } = this.toObject();
    return card;
}

export default model('Card', cardSchema);