import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
    getTribes,
    getTribeById,
    createTribe,
    deleteTribe,
    updateTribe
} from '../controllers/tribe.controller.js'

const router = Router()

router.get('/', authRequired, getTribes)
router.get('/:id', authRequired, getTribeById)

router.post('/', authRequired, createTribe)

router.delete('/:id', authRequired, deleteTribe)

router.put('/:id', authRequired, updateTribe)

export default router