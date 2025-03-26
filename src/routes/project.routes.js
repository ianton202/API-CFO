import { Router } from 'express'
import { body, param } from 'express-validator'
import { authRequired } from '../middlewares/validateToken.js'
import { handleInputErrors } from '../middlewares/validateInputErrors.js'
import {
    getProjects,
    getProjectById,
    createProject,
    deleteProject,
    updateProject
} from '../controllers/project.controller.js'

const router = Router()

router.get('/', authRequired, getProjects)
router.get('/:id', authRequired,
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    getProjectById)

router.post('/', authRequired,
    body('name')
        .notEmpty().isString().withMessage('Name cant be empty and must be a string'),
    body('client_id')
        .optional().isMongoId().withMessage('Invalid client ID'),
    body('tribe_id')
        .optional().isMongoId().withMessage('Invalid tribe ID'),
    body('collaborator_id')
        .optional().isMongoId().withMessage('Invalid collaborator ID'),
    handleInputErrors,    
    createProject)

router.delete('/:id', authRequired,
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    deleteProject)

router.put('/:id', authRequired,
    param('id')
        .isMongoId().withMessage('Invalid ID'),
        body('name')
        .optional().isString().withMessage('Name must be a string'),
    body('client_id')
        .optional().isMongoId().withMessage('Invalid client ID'),
    body('tribe_id')
        .optional().isMongoId().withMessage('Invalid tribe ID'),
    body('collaborator_id')
        .optional().isMongoId().withMessage('Invalid collaborator ID'),
    handleInputErrors,
    updateProject)

export default router;