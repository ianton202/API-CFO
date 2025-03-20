import Client from '../models/client.model.js'

export const getClients = async (_req, res) => {
    try {
        //.populate() sirve para que ademas de la info de clientes me traigan nombre y id del sector
        const clients = await Client.find().populate( 
        {
            path: "sector_id",
            select: "name"
        })

        if(clients.length === 0) {
            return res.status(204).json({ message: 'There are no clients in the database' })
        }

        res.status(200).json(clients)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the clients', error: error.message || error })
    }
}

export const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)

        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred when trying to find the client', error: error.message || error })
    }
}

export const createClient = async (req, res) => {

    const { name, sector_id, projects_id } = req.body
    
    try {
        const clientExists = await Client.findOne({ name })
        if (clientExists) {
            return res.status(409).json({ message: "Client already exists" })
        }

        const newClient = new Client({ 
            name,
            sector_id,
            projects_id
        })

        const savedClient = await newClient.save()

        res.status(200).json({ message: 'Client successfully created', data: savedClient })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the client', error: error.message || error })
    }
}

export const deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id)
        
        res.status(200).json({ message: 'Client successfully deleted', data: deletedClient })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred when trying to delete the client', error: error.message || error })
    }
}

export const updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
            //Para que devuelva el cliente actualizado
            new: true
        })

        res.status(200).json({ message: 'Client successfully updated', data: updatedClient })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the client', error: error.message || error })
    }
}