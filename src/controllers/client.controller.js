import Client from '../models/client.model.js'

export const getClients = async (_req, res) => {
    try {
        const clients = await Client.find()
        .populate({ path: 'sector_id', select: 'name' })
        .populate({ path: 'project_id', select: 'name' })

        if(clients.length === 0) {
            return res.status(404).json({ message: 'There are no clients in the database' })
        }

        res.status(200).json(clients)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the clients', error: error.message || error })
    }
}

export const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)
        .populate({ path: 'sector_id', select: 'name' })
        .populate({ path: 'project_id', select: 'name' })

        if(!client) {
            return res.status(404).json({ message: 'Client was not found' })
        }

        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while trying to find the client', error: error.message || error })
    }
}

export const createClient = async (req, res) => {

    const { name, sector_id, project_id } = req.body
    
    try {
        const clientExists = await Client.findOne({ name })
        if (clientExists) {
            return res.status(409).json({ message: 'Client already exists' })
        }

        const newClient = new Client({ 
            name,
            sector_id,
            project_id
        })
        const savedClient = await newClient.save()

        res.status(201).json({ message: 'Client successfully created', data: savedClient })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the client', error: error.message || error })
    }
}

export const deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id)

        if(!deletedClient) {
            return res.status(404).json({ message: 'Client was not found' })
        }
        
        res.status(200).json({ message: 'Client successfully deleted', data: deletedClient })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred when trying to delete the client', error: error.message || error })
    }
}

export const updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!updatedClient) {
            return res.status(404).json({ message: 'Client was not found' })
        }

        res.status(200).json({ message: 'Client successfully updated', data: updatedClient })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the client', error: error.message || error })
    }
}