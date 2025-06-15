import Cards from './cards.model.js';


export const addCard = async (req, res) => {
    try {
        const data = req.body
        const newCard = new Cards(data)
        await newCard.save()
        return res.status(200).send({
            success: true,
            message: 'Card added successfully',
            card: newCard
        })
    } catch (e) {
        return res.status(500).send({ message: 'Error adding card', e })
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