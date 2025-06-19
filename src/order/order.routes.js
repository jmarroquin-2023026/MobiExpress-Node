import { Router } from "express"
import {addOrder,getOrder,getOrderById,calculateDisponibility,updateOrderStatus,listOrderByUser} from './order.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()
api.post('/add',[validateJwt],addOrder)
api.get('/',[validateJwt],getOrder)
api.get('/:id',[validateJwt],getOrderById)
api.get('/list',[validateJwt],listOrderByUser)
api.post('/calculateDis',[validateJwt],calculateDisponibility)
api.put('/:id',[validateJwt],updateOrderStatus)
export default api