import { body } from "express-validator";
import { existsEmail,existsUser } from "../utils.js/db.validators.js";
import { validateErrors, validateErrorsWhitoutFiles } from "./validate.error.js";
export const isMyProfile=async(req,res,next)=>{
    try {
        let {id} = req.params
        let {user} = req
        if(user.uid != id)return res.send({success:false,message:'This is not your own profile'})
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).send({success:false,message:'Error whit authentication'})
    }
}

export const userValidator =[
    body('name','Name is required').notEmpty().isLength({min:3,max:30}),
    body('surname','Surname is required').notEmpty().isLength({min:3,max:30}),
    body('email','Email is required').notEmpty().isEmail().custom(existsEmail),
    body('username','Username is required').notEmpty().isLength({min:5,max:15}).custom(existsUser),
    body('password','Password is required').notEmpty().isLength({min:5,max:20}).isStrongPassword(),
    body('phone','Phone is required').notEmpty().isLength({min:13,max:13}),
    body('address','Adress is required').notEmpty().isLength({min:20,max:200}),
    validateErrors
]

export const updatedUserValidator =[
    body('name','Name is required').optional().notEmpty().isLength({min:3,max:30}),
    body('surname','Surname is required').optional().notEmpty().isLength({min:3,max:30}),
    body('email','Email is required').optional().notEmpty().isEmail().custom(existsEmail),
    body('username','Username is required').optional().notEmpty().isLength({min:5,max:15}).custom(existsUser),
    body('phone','Phone is required').optional().notEmpty().isLength({min:13,max:13}),
    body('address','Adress is required').optional().notEmpty().isLength({min:20,max:200}),
    validateErrorsWhitoutFiles
]