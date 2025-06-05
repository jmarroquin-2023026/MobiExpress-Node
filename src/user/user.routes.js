import { Router } from "express";
import { addUser, getUser, getUsers, updateUser } from "./user.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { uploadProfilePicture } from "../../middlewares/multer.upload.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js";
import { isMyProfile, updatedUserValidator, userValidator } from "../../middlewares/validators.js";
const api = Router()

api.post('/employe-register',[validateJwt,isAdmin,uploadProfilePicture.single('profilePicture'),userValidator,deleteFileOnError],addUser)
api.get('/get-employes',[validateJwt,isAdmin],getUsers)
api.get('/get-employe/:id',[validateJwt,isAdmin],getUser)
api.put('/update-employe/:id',[validateJwt,isMyProfile,updatedUserValidator],updateUser)
export default api