import { Router } from "express";
import { addProduct, getByCategory, getByName, getProduct, updateProduct, deleteProduct } from "./products.controller";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt";
import { addProductValidator, productUpdateValidator } from "../../middlewares/validators";
/* import { uploadCategoryPicture, } from "../../middlewares/multer.upload.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js";
import { getCurrentDirCategory } from "../../middlewares/get.current.dir.js"; */

const api = Router()

api.post('/addProduct',[isAdmin, validateJwt, addProductValidator],addProduct)
api.get('/getProduct', getProduct)
api.get('/getByCategory/:id', getByCategory)
api.get('/getByName/:name', getByName)
api.put('/updateProduct/:id', [isAdmin, validateJwt, productUpdateValidator],updateProduct)
api.delete('/deleteProduct/:id', [isAdmin, validateJwt], deleteProduct)