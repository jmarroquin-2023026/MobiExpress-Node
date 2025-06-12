import {dirname, join} from 'path'
import { fileURLToPath } from 'url'

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))

export const getCurrentDir = (req,res,next)=>{
    let fullPath = join(CURRENT_DIR,'../uploads/img/users')
    req.filePath = fullPath
    next()
}

export const getCurrentDirCategory = (req,res,next)=>{
    let fullPath = join(CURRENT_DIR,'../uploads/img/categories')
    req.filePath = fullPath
    next()
}

export const getCurrentDirProduct = (req,res,next)=>{
    let fullPath = join(CURRENT_DIR,'../uploads/img/products')
    req.filePath = fullPath
    next()
}