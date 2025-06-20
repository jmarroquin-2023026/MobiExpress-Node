import Cards from './cards.model.js';


export const addCard = async (req, res) => {
  try {
    console.log('User from token:', req.user);
    console.log('Data received:', req.body);
    
    const data = req.body;
    const user = req.user.uid;
    const newCard = new Cards({ ...data, user });

    await newCard.save();

    const populatedCard = await Cards.findById(newCard._id).populate('user', 'name surname -_id');
    return res.status(200).send({
      success: true,
      message: 'Card added successfully',
      card: populatedCard
    });
  } catch (e) {
    console.error('Error adding card:', e);
    return res.status(500).send({ message: 'Error adding card' });
  }
}


export const deleteCard = async (req, res) => {
    try {
        const { id } = req.params
        const card = await Cards.findByIdAndDelete(id)
        if (!card) return res.status(404).send(
            {
                success: false,
                message: 'Card not found'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Card deleted successfully',
                card
            }
        )
    } catch (e) {
        return res.status(500).send({ message: 'Error deleting card', e })
    }
}

export const listCardByUser=async(req,res)=>{
    try{
        const user=req.user.uid
        const{limit=20,skip=0}=req.query
        const cards=await Cards.find({user}).populate('user','name surname -_id')
        .limit(limit)
        .skip(skip)

        if(cards.length===0)return res.status(404).send({
            success:false,
            message:'Aún no cuenta con tarjetas registradas'
        })

        return res.status(200).send({
            success:true,
            message:'Sus tarjetas son:',
            cards
        })
    }catch(e){
        return res.status(500).send({ message: 'Error listing cards', e })
    }
}