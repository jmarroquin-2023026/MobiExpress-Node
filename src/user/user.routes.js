import { Router } from "express";
import { addUser, deleteUser, getUser, getUsers, updatePassword, updateUser } from "./user.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { uploadProfilePicture } from "../../middlewares/multer.upload.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js";
import { isAdminOr, isMyProfile, updatedUserValidator, userValidator } from "../../middlewares/validators.js";
import { getCurrentDir } from "../../middlewares/get.current.dir.js";
const api = Router()

api.post('/employe-register',[validateJwt,isAdmin,uploadProfilePicture.single('profilePicture'),userValidator,deleteFileOnError],addUser)
api.get('/get-employes',[validateJwt,isAdmin],getUsers)
api.get('/get-employe/:id',[validateJwt,isAdmin],getUser)
api.put('/update-employe/:id',[validateJwt,isMyProfile,updatedUserValidator],updateUser)
api.delete('/delete-employe/:id',[validateJwt,isAdminOr,getCurrentDir],deleteUser)
api.put('/update-password',[validateJwt],updatePassword)
export default api