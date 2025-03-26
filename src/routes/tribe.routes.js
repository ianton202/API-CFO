import { Router } from 'express'
import { body, param } from 'express-validator'
import { authRequired } from '../middlewares/validateToken.js'
import { handleInputErrors } from '../middlewares/validateInputErrors.js'
import {
    getTribes,
    getTribeById,
    createTribe,
    deleteTribe,
    updateTribe
} from '../controllers/tribe.controller.js'

const router = Router()

router.get('/', authRequired, getTribes)
router.get('/:id', authRequired,
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    getTribeById)

router.post('/', authRequired, 
    body('name')
        .notEmpty().isString().withMessage('Name cant be empty and must be a string'),
    body('collaborator_id')
        .optional().isMongoId().withMessage('Invalid collaborator ID'),
    handleInputErrors,
    createTribe)

router.delete('/:id', authRequired, 
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    deleteTribe)

router.put('/:id', authRequired, 
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    body('name')
        .optional().isString().withMessage('Name must be a string'),
    body('collaborator_id')
        .optional().isMongoId().withMessage('Invalid collaborator ID'),
    handleInputErrors,
    updateTribe)

export default router