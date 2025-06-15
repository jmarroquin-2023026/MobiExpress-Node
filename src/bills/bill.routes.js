import { Router } from "express";
import { addBill,getBillByUser,updateBill } from "./bill.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { addBillValidator, billUpdateValidator } from "../../middlewares/validators.js";


const api = Router()

api.post('/addBill',[validateJwt, isAdmin, addBillValidator],addBill)
api.get('/getBill/:id', getBillByUser)
api.put('/updateBill/:id', [validateJwt, isAdmin,billUpdateValidator],updateBill)

export default api