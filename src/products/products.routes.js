import { Router } from "express";
import { addProduct, getByCategory, getByName, getProduct, updateProduct, deleteProduct, getProductById } from "./products.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { addProductValidator, productUpdateValidator } from "../../middlewares/validators.js";
import { uploadProductPicture } from "../../middlewares/multer.upload.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js";
import { getCurrentDirProduct } from "../../middlewares/get.current.dir.js";

const api = Router()

api.post('/addProduct',[validateJwt, isAdmin, uploadProductPicture.array('images', 3), addProductValidator, deleteFileOnError],addProduct)
api.get('/getProduct', getProduct)
api.get('/getById/:id',[validateJwt],getProductById)
api.get('/getByCategory/:id', getByCategory)
api.get('/getByName/:name', getByName)
api.put('/updateProduct/:id', [validateJwt, isAdmin, uploadProductPicture.array('images',3), productUpdateValidator, deleteFileOnError],updateProduct)
api.delete('/deleteProduct/:id', [validateJwt,isAdmin,getCurrentDirProduct], deleteProduct)

export default api