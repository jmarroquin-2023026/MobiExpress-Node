'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { limiter } from '../middlewares/rate.limit.js'
import userRoutes from '../src/user/user.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import productsRoutes from '../src/products/products.routes.js'
import cardsRoutes from '../src/Cards/cards.routes.js'
import billsRoutes from '../src/bills/bill.routes.js'

import orderRoutes from '../src/order/order.routes.js'


const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cors())
    app.use(helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
      })
    )
    app.use(morgan('dev'))
    app.use(limiter)

    app.use('/uploads', cors(), express.static('uploads'))
}

const routes = (app)=>{ 
   app.use('/v1/user',userRoutes)
   app.use('/v1',authRoutes)
   app.use('/v1/category',categoryRoutes)
   app.use('/v1/products', productsRoutes)
   app.use('/v1/cards', cardsRoutes)
   app.use('/v1/bill', billsRoutes)
   app.use('/v1/order',orderRoutes)
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