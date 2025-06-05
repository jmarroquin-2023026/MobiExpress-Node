import User from "../user/user.model.js";
import { checkPassword, encrypt } from "../../utils.js/encrypt.js";
import { generateJwt } from "../../utils.js/jwt.js";



export const login = async(req,res)=>{
    try {
        let {userLogin,password} = req.body
        let user = await User.findOne({$or:[{email:user},{username:user}]})
        if(!user) return res.status(400).send({success:false,message:'User not found'})
        if(user && await checkPassword(user.password,password)){
            let loggedUser ={
                uid:user._id,
                username: user.username,
                name: user.name,
                role: user.role,
                profilePicture:user.profilePicture
            }
            let token = await generateJwt(loggedUser)
            return res.send({success:true,message:`Welcome user ${user.name}`,loggedUser,token})
        }
        return res.status(400).send({success:false,message:'Invalid Credentials'})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error whit login'})
    }
}