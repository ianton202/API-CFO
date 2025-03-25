import Tribe from '../models/tribe.model.js';

export const getTribes = async (_req, res) => {
    try {
        const tribes = await Tribe.find()

        if(tribes.length === 0) {
            return res.status(203).json({ message: 'There are no tribes in the database' })
        }

        res.status(200).json(tribes)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retieving the tribes', error: error.message || error })
    }
}

export const getTribeById = async (req, res) => {
    try {
        const tribe = await Tribe.findById(req.params.id)

        res.status(200).json(tribe)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while trying to find the tribe', error: error.message || error })
    }
}

export const createTribe = async (req, res) => {

    const { name, collaborator_id } = req.body

    try {
        const tribeExists = await Tribe.findOne({ name })
        if(tribeExists) {
            return res.status(409).json({ message: 'Tribe already exists' })
        }

        const newTribe = new Tribe({
            name,
            collaborator_id
        })
        const savedTribe = await newTribe.save()

        res.status(200).json({ message: 'Tribe successfully created', data: savedTribe })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the tribe', error: error.message || error })
    }
}

export const deleteTribe = async (req, res) => {
    try {
        const deletedTribe = await Tribe.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: 'Tribe successfully deleted', data: deletedTribe})
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the tribe', error: error.message || error })
    }
}

export const updateTribe = async (req, res) => {
    try {
        const updatedTribe = await Tribe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({ message: 'Tribe updated successfully', data: updatedTribe })
    } catch (error) {
        res.status(500).json({ message: '', error: error.message || error })
    }
}