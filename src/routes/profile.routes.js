import { Router } from 'express'
import { body, param } from 'express-validator'
import { authRequired } from '../middlewares/validateToken.js'
import { handleInputErrors } from '../middlewares/validateInputErrors.js'
import {
    getProfiles,
    getProfileById,
    createProfile,
    deleteProfile,
    updateProfile
} from '../controllers/profile.controller.js'

const router = Router()

router.get('/', authRequired, getProfiles)
router.get('/:id', authRequired, 
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    getProfileById)

router.post('/', authRequired,
    body('name')
        .notEmpty().isString().withMessage('Name cant be empty and must be a string'),
    handleInputErrors,
    createProfile)

router.delete('/:id', authRequired,
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    deleteProfile)

router.put('/:id', authRequired,
    param('id')
        .isMongoId().withMessage('Invalid ID'),
    body('name')
        .optional().isString().withMessage('Name must be a string'),
    handleInputErrors,
    updateProfile)

export default router