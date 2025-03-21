import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
    getProjects,
    getProjectById,
    createProject,
    deleteProject,
    updateProject
} from '../controllers/project.controller.js'

const router = Router()

router.get('/', authRequired, getProjects)
router.get('/:id', authRequired, getProjectById)

router.post('/', authRequired, createProject)

router.delete('/:id', authRequired, deleteProject)

router.put('/:id', authRequired, updateProject)

export default router;