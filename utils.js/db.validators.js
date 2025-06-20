import User from "../src/user/user.model.js"
import Category from "../src/category/category.model.js"
import Product from '../src/products/products.model.js'
import Card from '../src/Cards/cards.model.js'

export const existsUser = async(username)=>{
    const alreadyExists = await User.findOne({username})
    if(alreadyExists){
        console.error(`The username ${username} is already taken`)
        throw new Error(`The username ${username} is already taken`)
    }
}
export const existsEmail = async(email)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existCategory=async(name,category)=>{
    const alreadyCategory=await Category.findOne({name})
    if(alreadyCategory && alreadyCategory._id !=category._id){
        console.error(`Category ${name} already exist`)
        throw new Error(`Category ${name} already exist`)
    }
}

export const existProduct = async(name, product)=>{
    const alreadyProduct = await Product.findOne({name})
    if(alreadyProduct && alreadyProduct._id != product._id){
        console.error(`Product ${name} is already exist`)
        throw new Error(`Product ${name} is already exist`)
    }
}

export const existCard = async(number)=>{
    const alreadyCard = await Card.findOne({number})
    if(alreadyCard){
        console.error(`Card ${number} is already exist`)
        throw new Error(`Card ${number} is already exist`)
    }
}
