'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { limiter } from '../middlewares/rate.limit.js'
import userRoutes from '../src/user/user.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import categoryRoutes from '../src/category/category.routes.js'


const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=>{ 
   app.use('/v1/user',userRoutes)
   app.use('/v1',authRoutes)
   app.use('/v1/category',categoryRoutes)
}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(e){
        console.log('Server init failed', e)
    }
}