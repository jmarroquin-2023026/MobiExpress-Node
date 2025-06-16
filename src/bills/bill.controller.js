import Bill from './bill.model.js'

/* export const addBill=async(req,res)=>{
    try{
        const user=req.user.uid;
        const {cartId,NIT}=req.body
        const shopCart=await ShopCart.findById(cartId).populate('products.product')
        if(!shopCart){
            return res.status(404).send(
                {
                    message:'Shopping cart not found'
                }
            )
        }
        const products=shopCart.products.map(item=>(
            {
                product: item.product._id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity
            }
        ))
        const total=products.reduce((sum,item)=>sum+(item.price*item.quantity),0)
        const bill = new Bill({
            user,
            purchase:cartId,
            NIT,
            products,
            total
        })
        await bill.save()

        await ShopCart.findByIdAndUpdate(cartId,{products:[]})
        for(const item of shopCart.products){
            await Product.findByIdAndUpdate(
                item.product._id,
                { $inc: { stock: -item.quantity, sold: item.quantity } },
                { new: true }
            )
        }
        const savedBill = await Bill.findById(bill._id)
            .populate('products.product', '-_id name price')

        return res.status(200).send({
            success: true,
            message: 'Bill created successfully',
            savedBill
        })
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'Internal server error',e})
    }
} */
/* export const addBill = async (req, res) => {
    try {
        const data = req.body
        const newBill = new Bill(data)
        await newBill.save()
        return res.status(200).send({
            success: true,
            message: 'Bill added successfully',
            bill: newBill
        })
    } catch (e) {
        return res.status(500).send({ message: 'Error adding bill', e })
    }
}
 */
/* export const getBillByUser=async(req,res)=>{
    try{
        const user=req.user._id
        const{limit=20,skip=0}=req.query
        const bills=await Bill.find({user}).select(' -__v')
        .populate({
            path:'user',
            select:'name surname -_id'
        })
        .populate(
            {
                path:'products.product',
                select:'name price quantity -_id'
            }
        )
        .limit(limit)
        .skip(skip)
        return res.status(200).send(
            {
                success: true,
                message:'Your bills',
                bills
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'Internal server error',e})
    }
} */
export const getBillById=async(req,res)=>{
    try{
        const {id}=req.params
        const bill=await Bill.findById(id).populate({path:'user',select:'-_id name surname'})
        if(!bill)return res.status(404).send(
            {
                success:false,
                message:'Bill not found, try again',
            }
        )
        return res.status(200).send(
            {
                success:true,
                message:'Bill found',
                bill
            }
        )
    }catch(e){
        return res.status(500).send({message:'General error with obtaining bill',e})
    }
}

export const getBillByUser=async(req,res)=>{
    try{
        const {id}=req.params
        const bill=await Bill.find({user:id}).populate({path:'user',select:'-_id name surname'})
        if(!bill)return res.status(404).send(
            {
                success:false,
                message:'Bill not found, try again',
            }
        )
        return res.status(200).send(
            {
                success:true,
                message:'Bill found',
                bill
            }
        )
    }catch(e){
        return res.status(500).send({message:'General error with obtaining bill',e})
    }
}

export const getBills = async(req,res)=>{
    try {
        const {skip=0,limit=20} = req.query
        let bills = await Bill.find().skip(skip).limit(limit).populate({path:'user',select:'-_id name surname'})
        if(bills.length === 0) return res.status(404).send({success:false,message:'Bills not found'})
        return res.send({success:true,message:bills})
    } catch (error) {
        console.log(error)
         return res.status(500).send({success:false,message:'General error listing the Bills'})
    }
}

/* export const updateBill = async (req, res) => {
    try {
        const {id} = req.params
        const bill = await Bill.findById(id)
        if (!bill) {
            return res.status(404).send({ success: false, message: 'Bill not found'})
        }
        bill.status = false
        await bill.save()
        const newBill = new Bill(
            {
                user: bill.user,
                /* purchase: bill.purchase, 
                client: bill.client,
                products: bill.products,
                total: bill.total,
                status: true
            }
        )
        await newBill.save()
        return res.status(200).send({
            success: true,
            message: 'Bill canceled and duplicated successfully',
            originalBill: bill,
            newBill: newBill
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'Internal server error', error })
    }
}*/