//Gestionar las imagenes
import multer, { diskStorage } from "multer"
import {dirname, extname, join} from 'path'
import { fileURLToPath } from "url"

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
const MIMETYPES = ["image/jpeg", "image/png", "image/jpg"]
const MAX_SIZE = 10000000

const multerConfig = (destinationPath) =>{
    
    return multer(
        {
            storage: diskStorage(
                {
                    destination: (req, file, cb)=>{
                        const fullPath = join(CURRENT_DIR, destinationPath)
                        req.filePath = fullPath
                        cb(null, fullPath)
                    },
                    filename: (req,file,cb)=>{
                        const fileExtension = extname(file.originalname) 
                        const fileName = file.originalname.split(fileExtension)[0]
                        cb(null, `${fileName}-${Date.now()}${fileExtension}`)//futbol-51681351.png
                    }
                }
            ),
            fileFilter:(req, file, cb)=>{
                if(MIMETYPES.includes(file.mimetype)) cb(null, true)
                else cb(new Error(`Only ${MIMETYPES.join(" ")} are allowed`))
            },
            limits: {
                fileSize: MAX_SIZE
            }
        }
    )
}

export const uploadProfilePicture = multerConfig('../uploads/img/users')
export const uploadCategoryPicture= multerConfig('../uploads/img/categories')
export const uploadProductPicture= multerConfig('../uploads/img/products')

