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