import { Router } from 'express'
import { body, param } from 'express-validator'
import { authRequired } from '../middlewares/validateToken.js'
import { handleInputErrors } from '../middlewares/validateInputErrors.js'
import {
    getClients,
    getClientById,
    createClient,
    deleteClient,
    updateClient
} from '../controllers/client.controller.js'

const router = Router()

router.get('/', authRequired, getClients)
router.get('/:id', authRequired, 
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    getClientById)

router.post('/', authRequired, 
    body('name')
        .notEmpty().withMessage('Name cant be empty'),
    handleInputErrors,
    createClient)

router.delete('/:id', authRequired,
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    deleteClient)

router.put('/:id', authRequired, 
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    body('name')
        .optional().isString().withMessage('Name must be a string'),
    body('sector_id')
        .optional().isMongoId().withMessage('Invalid sector ID'),
    body('project_id')
        .optional().isMongoId().withMessage('Invalid project ID'),
    handleInputErrors,
    updateClient)

export default router