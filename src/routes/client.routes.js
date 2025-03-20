import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
    getClients,
    getClientById,
    createClient,
    deleteClient,
    updateClient
} from '../controllers/client.controller.js'

const router = Router()

router.get('/', authRequired, getClients)
router.get('/:id', authRequired, getClientById)

router.post('/', authRequired, createClient)

router.delete('/:id', authRequired, deleteClient)

router.put('/:id', authRequired, updateClient)

export default router