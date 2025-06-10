import { body } from "express-validator";
import { existCategory, existsEmail,existsUser } from "../utils.js/db.validators.js";
import { validateErrors,validateErrorsGeneral, validateErrorsWhitoutFiles } from "./validate.error.js";
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

export const isAdminOr = async(req,res,next)=>{
    try {
        let {user} = req
        let {id} = req.params
        if(user.role === 'ADMIN'){
            next()
        }else if(user.uid != id)return res.send({success:false,message:'This is not your own profile'})
    } catch (error) {
        console.log(error);
        return res.status(401).send({success:false,message:'Error whit authenticating'})
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

export const categoryValidator=[
    body('name','Name of category is required').optional().notEmpty().isLength({min:3,max:50}).custom(existCategory),
    body('description','Description of category is required').optional().notEmpty().isLength({min:10,max:150}),
    validateErrors
]

export const updateCategoryValidator=[
    body('name').optional().notEmpty().custom((category,{req})=>existCategory(category,{_id:req.params.id})),
    body('description').optional().notEmpty().isLength({min:3,max:50}),
    body('picture').optional().notEmpty(),
    validateErrors,
    validateErrorsWhitoutFiles
]

export const addProductValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existProduct),
    body('description', 'Description cannot be empty')
        .notEmpty()
        .isLength({max:50}),
    body('price','Price cannot be empty')
        .notEmpty(),
    body('category','Category not exist')
        .notEmpty(),
    body('stock','Stock cannot be empty')
        .notEmpty(),
    body('datesAvalible','Dates Avalible cannot be empty')
        .notEmpty(),
    body('discount')
        .optional(),
    validateErrors
]
gh
export const productUpdateValidator=[
    body('name','Name cannot be empty').notEmpty().toLowerCase().custom(existProduct),
    body('description','Description cannot be empty').notEmpty(),
    body('price','Price cannot be empty').notEmpty(),
    body('category','Category cannot be empty').notEmpty(),
    body('stock','Stock cannot be empty').notEmpty(),
    body('datesAvalible','Dates Avalible cannot be empty').notEmpty(),
    body('discount')
    .optional(),
    validateErrors
]