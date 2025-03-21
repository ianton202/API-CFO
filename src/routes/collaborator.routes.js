import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
    getCollaboratorById,
    getCollaborators,
    createCollaborator,
    deleteCollaborator,
    updateCollaborator
} from '../controllers/collaborator.controller.js'

const router = Router()

router.get('/', authRequired, getCollaborators)
router.get('/:id', authRequired, getCollaboratorById)

router.post('/', authRequired, createCollaborator)

router.delete('/:id', authRequired, deleteCollaborator)

router.put('/:id', authRequired, updateCollaborator)

export default router