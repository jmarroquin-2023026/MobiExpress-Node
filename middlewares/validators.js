import { body } from "express-validator";
import { existsEmail,existsUser } from "../utils.js/db.validators.js";
import { validateErrors, validateErrorsWhitoutFiles } from "./validate.error.js";

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