import { Router } from 'express'
import { body, param } from 'express-validator'
import { authRequired } from '../middlewares/validateToken.js'
import { handleInputErrors } from '../middlewares/validateInputErrors.js'
import {
    getSectors,
    getSectorById,
    createSector,
    deleteSector,
    updateSector
} from '../controllers/sector.controller.js'

const router = Router()

router.get('/', authRequired, getSectors)
router.get('/:id', authRequired,
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    getSectorById)

router.post('/', authRequired,
    body('name')
        .notEmpty().isString().withMessage('Name cant be empty and must be a string'),
    handleInputErrors,
    createSector)

router.delete('/:id', authRequired,
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    deleteSector)

router.put('/:id', authRequired,
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    body('name')
        .optional().isString().withMessage('Name must be a string'),
    handleInputErrors,
    updateSector)

export default router