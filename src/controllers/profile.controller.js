import Profile from '../models/profile.model.js';

export const getProfiles = async (_req, res) => {
    try {
        const profiles = await Profile.find()

    if(profiles.length === 0) {
        return res.status(203).json({ message: 'There are no profiles in the database' })
    }

        res.status(200).json(profiles)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the profiles', error: error.message || error})
    }
}

export const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id)
        
        res.status(200).json(profile)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred when trying to find the profile', error: error.message || error })
    }
}

export const createProfile =  async (req, res) => {

    const { name } = req.body

    try {
        const profileExists = await Profile.findOne({ name })
        if (profileExists) {
            return res.status(409).json({ message: 'Profile already exists' })
        }

        const newProfile = new Profile({
            name
        })

        const savedProfile = await newProfile.save()

        res.status(200).json({ message: 'Profile successfully created', data: savedProfile})
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the sector', error: error.message || error })
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const deletedProfile = await Profile.findByIdAndDelete(req.params.id)
        
        res.status(200).json({ message: 'Profile successfully deleted', data: deletedProfile})
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the profile', error: error.message || error })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        res.status(200).json({ message: 'Profile updated successfully', data: updatedProfile })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the profile', error: error.message || error })
    }
}