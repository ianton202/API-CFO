import Project from '../models/project.model.js';

export const getProjects = async (_req, res) => {
    try {
        const projects = await Project.find()
        .populate({ path: 'client_id', select: 'name' })
        .populate({ path: 'tribe_id', select: 'name' })
        .populate({ path: 'collaborator_id', select: 'name' })

        if(projects.length === 0) {
            return res.status(404).json({ message: 'There are no projects in the database' })
        }

        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the projects', error: error.message || error })
    }
}

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        .populate({ path: 'client_id', select: 'name' })
        .populate({ path: 'tribe_id', select: 'name' })
        .populate({ path: 'collaborator_id', select: 'name' })

        if(!project) {
            return res.status(404).json({ message: 'Project was not found' })
        }
        
        res.status(200).json(project)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while trying to find the project', error: error.message || error })
    }
}

export const createProject = async (req, res) => {
    
    const { name, client_id, tribe_id, collaborator_id } = req.body
    
    try {
        const projectExists = await Project.findOne({ name })
        if(projectExists) {
            return res.status(409).json({ message: 'Project already exists' })
        }

        const newProject = new Project({
            name,
            client_id,
            tribe_id,
            collaborator_id
        })
        const savedProject = await newProject.save()
        
        res.status(201).json({ message: 'Project successfully created', data: savedProject })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the project', error: error.message || error })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id)

        if(!deletedProject) {
            return res.status(404).json({ message: 'Project was not found' })
        }

        res.status(200).json({ message: 'Project successfully deleted', data: deletedProject })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the project', error: error.message || error })
    }
}

export const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!updatedProject) {
            return res.status(404).json({ message: 'Project was not found' })
        }

        res.status(200).json({ message: 'Project successfully updated', data: updatedProject })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the project', error: error.message || error })   
    }
}