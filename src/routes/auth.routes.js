import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
    uProfile,
    register,
    login,
    logout
} from '../controllers/auth.controller.js'

const router = Router()

router.get('/uProfile', authRequired, uProfile)

router.post('/register', register)
router.post('/login', login)
router.post('/logout', authRequired, logout)

export default router