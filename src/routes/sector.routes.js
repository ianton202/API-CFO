import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
    getSectors,
    getSectorById,
    createSector,
    deleteSector,
    updateSector
} from '../controllers/sector.controller.js'

const router = Router()

router.get('/', authRequired, getSectors)
router.get('/:id', authRequired, getSectorById)

router.post('/', authRequired, createSector)

router.delete('/:id', authRequired, deleteSector)

router.put('/:id', authRequired, updateSector)

export default router