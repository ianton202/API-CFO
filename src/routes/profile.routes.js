import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
    getProfiles,
    getProfileById,
    createProfile,
    deleteProfile,
    updateProfile
} from '../controllers/profile.controller.js'

const router = Router()

router.get('/', authRequired, getProfiles)
router.get('/:id', authRequired, getProfileById)

router.post('/', authRequired, createProfile)

router.delete('/:id', authRequired, deleteProfile)

router.put('/:id', authRequired, updateProfile)

export default router