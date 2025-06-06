import Category from "./category.model.js"

export const defaultCategories= async()=>{
    try{
        const categories=await Category.countDocuments()
        if(categories===0){
            const defaultCategory=[
                {name:'Mobiliario para eventos',description:'Todo tipo de mobiliario para distintos eventos'},
                {name:'Decoración',description:'Materiales decorativos para eventos'},
                {name:'Cristaleria',description:'Productos de vidrio y cristal ideales para eventos especiales'},
                {name:'General',description:'Categoria genral de productos'}
            ]
            await Category.insertMany(defaultCategory)
            console.log('Default categories added successfully')
        }
            console.log('Default categories already exists')
    }catch(e){
        console.error('General error adding default categories')
    }
}


export const addCategory = async(req,res)=>{
    try{
        const data=req.body
        const category=new Category(data)
        category.picture = req.file.filename ?? null
        await category.save()
        return res.status(200).send(
            {
                success:true,
                message:'category saved successfully',
                category
            }
        )
    }catch(e){
        return res.status(500).send({message:'Internal server Error',e})
    }
}



export const listCategories=async(req,res)=>{
    try{
        const {limit=20,skip=0}=req.query
        const categories=await Category.find()
            .skip(skip)
            .limit(limit)
        
        if(categories.length===0)return res.status(404).send(
            {
                success:false,
                message:'Categories not found'
            }
        )
        return res.status(200).send({
            succes:true,
            message:'Categories found',
            categories
        })
    }catch(e){
        return res.status(500).send({message:'General error with obtaining categories',e})
    }
}

export const findCategory=async(req,res)=>{
    try{
        const {id}=req.params
        const category=await Category.findById(id)
        if(!category)return res.status(404).send(
            {
                success:false,
                message:'Category not found, try again',
            }
        )
        return res.status(200).send(
            {
                success:true,
                message:'Category found',
                category
            }
        )
    }catch(e){
        return res.status(500).send({message:'General error with obtaining category',e})
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (req.file) {
            const photoFilename = req.file.filename;
            data.picture = photoFilename
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });

        if (!updatedCategory) {
            return res.status(404).send({
                success: false,
                message: 'Category not found',
            })
        }


        return res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            updatedCategory
        })
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            message: 'General error updating category',
            e,
        })
    }
}


export const deleteCategory=async(req,res)=>{
    try{
        const {id}=req.params
        const generalCategory=await Category.findOne({name:'General'})
        if(id==generalCategory._id)return res.status(400).send(
            {
                success:false,
                message:'General Category cannot be deleted'
            }
        )
        const deletedCategory=await Category.findByIdAndDelete(id)
        if(!deletedCategory)return res.status(404).send(
            {
                success:false,
                message:'Category not found'
            }
        )
        await deleteUserPhotos(user.profilePicture,req.filePath)
        return res.status(200).send(
            {
                success:true,
                message:'Category deleted successfully'
            }
        )
    }catch(e){
        return res.status(500).send({message:'General error deleting category',e})
    }
}

