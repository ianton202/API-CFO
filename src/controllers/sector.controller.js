import Sector from '../models/sector.model.js'

export const getSectors = async (_req, res) => {
    try {
        const sectors = await Sector.find()

        if(sectors.length === 0) {
            return res.status(404).json({ message: 'There are no sectors in the database' })
        }

        res.status(200).json(sectors)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the sectors', error: error.message || error })
    }
}

export const getSectorById = async (req, res) => {
    try {
        const sector = await Sector.findById(req.params.id)

        if (!sector) {
            return res.status(404).json({ message: 'Sector was not found' })
        }

        res.status(200).json(sector)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while trying to find the sector', error: error.message || error })
    }
}

export const createSector = async (req, res) => {

    const { name } = req.body

    try {
        const sectorExists = await Sector.findOne({ name })
        if(sectorExists) {
            return res.status(409).json({ message: 'Sector already exists' })
        }

        const newSector = new Sector({
            name
        })
        const savedSector = await newSector.save()

        res.status(201).json({ message: 'Sector successfully created', data: savedSector })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the sector', error: error.message || error })
    }
}

export const deleteSector = async (req, res) => {
    try {
        const deletedSector = await Sector.findByIdAndDelete(req.params.id)

        if(!deletedSector) {
            return res.status(404).json({ message: 'Sector was not found' })
        }

        res.status(200).json({ message: 'Sector successfully deleted', data: deletedSector })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the sector', error: error.message  || error })
    }
}

export const updateSector = async (req, res) => {
    try {
        const updatedSector = await Sector.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!updatedSector) {
            return res.status(404).json({ message: 'Sector was not found' })
        }

        res.status(200).json({ message: 'Sector successfully updated', data: updatedSector })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the sector', error: error.message || error })
    }
}