import Collaborator from '../models/collaborator.model.js'

export const createCollaborator = async (req, res) => {
    const {name, lastName, email, profile, tribe, projects} = req.body

    try {
        const newCollaborator = new Collaborator({
            name,
            lastName,
            email,
            profile,
            tribe,
            projects
        });

        console.log(newCollaborator)
        /*
        const collaboratorSaved = await newCollaborator.save(); //CAMBIAR POR savedCollaborator
        res.json(collaboratorSaved)
        */
    } catch (error) {
        console.log(error);
    }
};