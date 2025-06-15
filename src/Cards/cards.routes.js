import { Router } from "express";
import { addCard,deleteCard } from "./cards.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { addCardValidator } from "../../middlewares/validators.js";


const api = Router()

api.post('/addCard',[validateJwt, isAdmin, addCardValidator],addCard)
api.delete('/deleteCard/:id', [validateJwt, isAdmin],deleteCard)

export default api