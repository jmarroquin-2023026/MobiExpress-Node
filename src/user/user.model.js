    import {Schema,model} from "mongoose"

const userSchema = Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        minlegth:[3,'The surname number must have at least 3 characters'],
        maxlegth:[30,`Surname can't overcome 30 characters`]
    },
    surname:{
        type: String,
        required: [true,'Surname is required'],
        minlegth:[3,'The surname number must have at least 3 characters'],
        maxlegth:[30,`Surname can't overcome 30 characters`]
    },
    email:{
        type: String,
        required: [true,'Email is required'],
    },
    username:{
        type: String,
        unique: true,
        lowecase: true,
        required: [true,'Username is required'],
        minlegth:[5,'The username mus have at least 5 characters'],
        maxlegth:[15,`username can't overcome 15 characters`]
    },
    password:{
        type: String,
        required: [true,'Password is required'],
        minlegth: [5,'Password must have at least 5 characters']
    },
    phone:{
        type:String,
        required:[true,'Phone is required'],
        minlegth:[13,'The phone number must have at least 8 characters'],
        maxlegth:[13,`Can't overcome 8 characters`]
    },
    role:{
        type: String,
        uppercase: true,
        enum: ['CLIENT','ADMIN','EMPLOYE'],
        required: [true,'Role is required'],
        default: 'CLIENT',
    },
    address:{
        type:String,
        required:[true,'Address is required'],
        minlegth:[20,'Address must have at least 20 characters'],
        maxlegth:[200,`Address can't overcome the 200 characters`]
    },
    profilePicture:{
        type: String
    }
})

userSchema.methods.toJSON = function(){
    const {___v, password,...user}= this.toObject()
    return user
}

export default model('User',userSchema)