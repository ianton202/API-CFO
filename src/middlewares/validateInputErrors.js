import { validationResult } from "express-validator"

export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()) {
        return res.status(400).json({ meesage: 'An error occurred while validating the inputs', errors: errors.array() })
    }

    next()
}