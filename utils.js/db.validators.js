import User from "../src/user/user.model.js"
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