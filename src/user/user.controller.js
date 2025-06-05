import User from "./user.model.js";
import { encrypt } from "../../utils.js/encrypt.js";
export const addUser = async(req,res)=>{
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role='EMPLOYE'
        user.profilePicture = req.file.filename ?? null
        await user.save()
        return res.send({success:true,message:'User successfully added'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:'General Error registerin the user'})
    }
}

export const getUsers = async(req,res)=>{
    try {
        const {limit = 20,skip=0} = req.query
        let users = await User.find().limit(limit).skip(skip)
        if(users.length === 0) return res.status(404).send({success:false,message:'Users not found'})
        return res.send({success:true,message:users})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error listing the users'})
    }
}