import {Router} from 'express'
import { body, param } from 'express-validator'
import { authRequired } from '../middlewares/validateToken.js'
import { handleInputErrors } from '../middlewares/validateInputErrors.js'
import {
    getCollaboratorById,
    getCollaborators,
    createCollaborator,
    deleteCollaborator,
    updateCollaborator
} from '../controllers/collaborator.controller.js'

const router = Router()

router.get('/', authRequired, getCollaborators)
router.get('/:id', authRequired, 
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    getCollaboratorById)

router.post('/', authRequired, 
    body('name')
        .notEmpty().isString().withMessage('Name cant be empty and must be a string'),
    body('email')
        .isEmail().withMessage('Email is invalid'),
    body('profile_id')
        .optional().isMongoId().withMessage('Invalid profile ID'),
    body('project_id')
        .optional().isMongoId().withMessage('Invalid project ID'),
    handleInputErrors,
    createCollaborator)

router.delete('/:id', authRequired,
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    deleteCollaborator)

router.put('/:id', authRequired, 
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    body('name')
        .optional().isString().withMessage('Name must be a string'),
    body('email')
        .optional().isEmail().withMessage('Email is invalid'),
    body('profile_id')
        .optional().isMongoId().withMessage('Invalid profile ID'),
    body('project_id')
        .optional().isMongoId().withMessage('Invalid project ID'),
    handleInputErrors,
    updateCollaborator)

export default router