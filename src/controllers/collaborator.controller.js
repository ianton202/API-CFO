import Collaborator from '../models/collaborator.model.js'

export const getCollaborators = async (_req, res) => {
    try {
        const collaborators = await Collaborator.find()
        .populate({ path: 'profile_id', select: 'name' })
        .populate({ path: 'tribe_id', select: 'name' })
        .populate({ path: 'project_id', select: 'name' })

        if(collaborators.length === 0) {
            return res.status(404).json({ message: 'There are no collaborators in the database' })
        }

        res.status(200).json(collaborators)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the collaborators', error: error.message || error })
    }
}

export const getCollaboratorById = async (req, res) => {
    try {
        const collaborator = await Collaborator.findById(req.params.id)
        .populate({ path: 'profile_id', select: 'name' })
        .populate({ path: 'tribe_id', select: 'name' })
        .populate({ path: 'project_id', select: 'name' })

        if(!collaborator) {
            return res.status(404).json({ message: 'Collaborator was not found' })
        }

        res.status(200).json(collaborator)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while trying to find the project', error: error.message || error })   
    }
}

export const createCollaborator = async (req, res) => {

    const { name, email, profile_id, tribe_id, project_id } = req.body

    try {
        const collaboratorExists = await Collaborator.findOne({ name })
        if(collaboratorExists) {
            return res.status(409).json({ message: 'Collaborator already exists' })
        }

        const newCollaborator = new Collaborator({
            name,
            email,
            profile_id,
            tribe_id,
            project_id
        })
        
        const savedCollaborator = await newCollaborator.save()

        res.status(201).json({ message: 'Collaborator successully created', data: savedCollaborator })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the collaborator', error: error.message || error })
    }
}

export const deleteCollaborator = async (req, res) => {
    try {
        const deletedCollaborator = await Collaborator.findByIdAndDelete(req.params.id)

        if(!deletedCollaborator) {
            return res.status(404).json({ message: 'Collaborator was not found' })
        }

        res.status(200).json({ message: 'Collaborator successfully deleted', data: deletedCollaborator })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the collaborator', error: error.message || error })
    }
}

export const updateCollaborator = async (req, res) => {
    try {
        const updatedCollaborator = await Collaborator.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        if(!updatedCollaborator) {
            return res.status(404).json({ message: 'Collaborator was not found' })
        }

        res.status(200).json({ message: 'Collaborator successfully updated', data: updatedCollaborator })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the collaborator', error: error.message || error })
    }
}