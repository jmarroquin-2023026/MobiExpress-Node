import { Router } from "express";
import { addUser } from "./user.controller.js";
import { isAdmin } from "../../middlewares/validate.jwt.js";
import { uploadProfilePicture } from "../../middlewares/multer.upload.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js";
import { employeValidator } from "../../middlewares/validators.js";
const api = Router()

api.post('/employe-register',[isAdmin,uploadProfilePicture.single('profilePicture'),employeValidator,deleteFileOnError],addUser)

export default api