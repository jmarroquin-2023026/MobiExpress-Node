import { Router } from "express";
import { addCard,deleteCard, listCardByUser } from "./cards.controller.js";
import { allowAllRoles, isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { addCardValidator } from "../../middlewares/validators.js";


const api = Router()

api.post('/addCard',[validateJwt, allowAllRoles, addCardValidator],addCard)
api.delete('/deleteCard/:id', [validateJwt, allowAllRoles],deleteCard)
api.get('/list',[validateJwt,allowAllRoles],listCardByUser)

export default api