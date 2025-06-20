import { Router } from "express";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { categoryValidator, updateCategoryValidator } from "../../middlewares/validators.js";
import { addCategory, deleteCategory, findCategory, listCategories, updateCategory } from "./category.controller.js";
import { uploadCategoryPicture, } from "../../middlewares/multer.upload.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js";
import { getCurrentDirCategory } from "../../middlewares/get.current.dir.js";

const api = Router()

api.post('/category-register', [
        uploadCategoryPicture.single('picture'), validateJwt,
        isAdmin, categoryValidator, deleteFileOnError
    ],addCategory)

api.get('/category-list', listCategories)
api.get('/:id', findCategory)
api.put('/category-update/:id', [
        uploadCategoryPicture.single('picture'),validateJwt, isAdmin, 
        updateCategoryValidator,deleteFileOnError
    ], updateCategory)

api.delete('/category-delete/:id',[validateJwt,isAdmin,getCurrentDirCategory],deleteCategory)

export default api