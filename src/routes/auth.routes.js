import { Router } from 'express'
import { body } from 'express-validator'
import { authRequired } from '../middlewares/validateToken.js'
import { handleInputErrors } from '../middlewares/validateInputErrors.js'
import {
    uProfile,
    register,
    login,
    logout
} from '../controllers/auth.controller.js'

const router = Router()

router.get('/uProfile', authRequired, uProfile)

router.post('/register', 
    body('username')
        .notEmpty().withMessage('Username cant be empty')
        .isLength({ min: 3 }).withMessage('Username is too short'),
    body('email')
        .isEmail().withMessage('Email is invalid'),
    body('password')
        .isLength({ min: 4 }).withMessage('Password must have at least 8 characters')
        .matches(/[ a-z ]/).withMessage('Password must have at least one lowercase letter')
        .matches(/[ 0-9 ]/).withMessage('Password must have at least one number'),
    handleInputErrors,
    register)

router.post('/login', 
    body('email')
        .isEmail().withMessage('Email is invalid'),
    body('password')
        .isLength({ min: 4 }).withMessage('Password must have at least 8 characters'),
    handleInputErrors,
    login)
    
router.post('/logout', authRequired, logout)

export default router