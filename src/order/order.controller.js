import Order from './order.model.js'
import Products from '../products/products.model.js'

export const calculateDisponibility = async(req,res)=>{
    try{
        let {consultDate, order} = req.body
        const date = new Date(consultDate)
        const {limit=20,skip=0} = req.query
        let existOrder = await Order.findById(order)
        if (!existOrder) return res.status(404).send({success:false,message:'The order do not exist'})
        let reservs =await Order.find({order:order})
            .skip(skip)
            .limit(limit)
        if(reservs.length === 0){
            return res.send({success:true,message:existOrder.amount})
        } 
        reservs = reservs.filter((reserv)=>{
            const entrance = new Date(reserv.dueDate)
            const exit = new Date(reserv.returnDate)
            return entrance <= date && exit > date
        })

        const disponibleProducts = existOrder.amount = reservs.length
        return res.send({success:true,message:disponibleProducts})
    }catch (e){
        console.error(e)
        return res.status(500).send({success:false,message:'General error calculating the disponibility',e})
    }
}

export const addOrder = async (req, res) => {
    try {
        const user = req.user.uid
        const { products, ...data } = req.body

        if (!products || products.length === 0) {
            return res.status(400).send({ message: "Shopping cart is empty" })
        }

        if (!data.dueDate || !data.returnDate) {
            return res.status(400).send({ message: "dueDate and returnDate are required" })
        }

        let total = 0

        for (const item of products) {
            const { product: productId, quantity } = item

            const product = await Products.findById(productId)
            if (!product) {
                return res.status(404).send({ message: `Product not found` })
            }

            if (product.stock < quantity) {
                return res.status(400).send({ message: `Not enough stock for product ${product.name}` })
            }

            total += product.price * quantity
        }

        for (const item of products) {
            const { product: productId, quantity } = item

            const product = await Products.findById(productId)
            product.stock -= quantity
            await product.save()
        }

        const order = new Order({
            user,
            products,
            total,
            ...data
        })

        await order.save()

        return res.status(201).send({
            success: true,
            message: "Order created successfully",
            order,
        })
    } catch (e) {
        console.error(e)
        return res.status(500).send({success:false, message: "Internal server error", e })
    }
}


export const getOrder = async(req,res)=>{
    try{
        const{limit = 20, skip = 0} = req.query
        let report=await Order.find()
            .skip(skip)
            .limit(limit)

        if(!report.length===0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Order not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message:'Order found',
                report
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success: false, message: 'General error',e})
    }
}

export const getOrderById = async(req,res)=>{
    try{
        let {id} = req.params
        let order = await Order.findById(id)

        if(!order) return res.status(404).send(
            {
                success: false,
                message: 'Order not found'
            }
        )
        return res.send(
            {
                success:true,
                message: 'Order found',
                order
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        if (!['in_use', 'returned'].includes(status)) {
            return res.status(400).send({ message: "Invalid status. Must be 'in_use' or 'returned'." })
        }

        const order = await Order.findById(id)
        if (!order) {
            return res.status(404).send({ message: "Order not found" })
        }

        if (order.status === status) {
            return res.status(400).send({ message: `Order is already '${status}'` })
        }

        for (const item of order.products) {
            const { product: productId, quantity } = item
            const product = await Products.findById(productId)
            if (!product) continue

            if (status === 'returned') {
                product.stock += quantity
            } else if (status === 'in_use') {
                if (product.stock < quantity) {
                    return res.status(400).send({ message: `Not enough stock for product ${product.name}` })
                }
                product.stock -= quantity
            }

            await product.save()
        }

        order.status = status
        await order.save()

        return res.status(200).send({
            success: true,
            message: `Order status updated to '${status}' and stock updated accordingly.`,
            order
        })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ message: "Internal server error", e })
    }
}
