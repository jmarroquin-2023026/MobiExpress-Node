import { Router } from "express"
import {addOrder,getOrder,getOrderById,calculateDisponibility,updateOrderStatus,listOrderByUser} from './order.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()
api.post('/add', [validateJwt], addOrder)
api.get('/list', [validateJwt], listOrderByUser) // <- Mover esta antes de /:id
api.get('/', [validateJwt], getOrder)
api.get('/:id', [validateJwt], getOrderById)     // <- Esta debe estar al final
api.post('/calculateDis', [validateJwt], calculateDisponibility)
api.put('/:id', [validateJwt], updateOrderStatus)
export default api