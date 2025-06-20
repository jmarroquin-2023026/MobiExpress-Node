import { Router } from "express";
import { getBillById,getBillByUser, getBills } from "./bill.controller.js";
import {  isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";


const api = Router()


api.get('/getBill/:id', getBillById)
api.get('/getBillByUser/:id',[validateJwt],getBillByUser)
api.get('/getBills',[validateJwt,isAdmin],getBills)
export default api