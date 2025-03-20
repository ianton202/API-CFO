import Project from '../models/project.model.js';

export const getProjects = async (_req, res) => {
    try {
        const projects = await Project.find()

        if(projects.length === 0) {
            return res.status(204).json({ message: 'There are no projects in the database' })
        }

        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the projects', error: error.message || error })
    }
}

export const getProjectsById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        
        res.status(200).json(project)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while trying to find the project', error: error.message || error })
    }
}

export const createProject = async (req, res) => {
    
    const { name, client_id, tribe_id, collaborators_id } = req.body
    
    try {
        const projectExists = await Project.findOne({ name })
        if(projectExists) {
            return res.status(409).json({ message: 'Project already exists' })
        }

        const newProject = new Project({
            name,
            client_id,
            tribe_id,
            collaborators_id
        })

        const savedProject = await newProject.save()
        
        res.status(200).json({ message: 'Project successfully created', data: savedProject})
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the project', error: error.message || error })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: 'Project successfully deleted', data: deletedProject })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the project', error: error.message || error })
    }
}

export const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        res.status(200).json({ message: 'Project successfully updated', data: updatedProject })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the project', error: error.message || error })   
    }
}